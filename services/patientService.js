const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getPatientById(id) {
    return await prisma.patient.findUnique({
        where: {
            id: parseInt(id),
            status: {
                not: "Deleted"
            }
        },
    });
}

async function getPatientProfile(id) {
    id = parseInt(id)
    const patient = await prisma.patient.findUnique({
        where: {
            id: id,
            status: {
                not: "Deleted"
            }
        },
    });
    if (!patient) return null;
    const visits = await prisma.visit.findMany({
        where: {
            patient_id: id,
        },
        select: {
            id: true,
            name: true,
            charge: true,
            date: true,
        }
    });
    const payments = await prisma.payment.findMany({
        where: {
            patient_id: id
        },
        select: {
            id: true,
            amount: true,
            date: true,
            Doctor: {
                select: {
                    name: true
                }
            },
        }
    });


    const totalCharge = (await prisma.visit.aggregate({
        where: {
            patient_id: id,
        },
        _sum: {
            charge: true
        },
    }))._sum.charge;
    const paymentAmount = (await prisma.payment.aggregate({
        where: {
            patient_id: id,
        },
        _sum: {
            amount: true
        }
    }))._sum.amount;

    return {
        name: patient.name,
        phone: patient.phone,
        dues: (totalCharge - paymentAmount) || -1,
        sex: patient.sex,
        birth: patient.birth.toISOString(),
        visits: visits || [],
        payments: payments || []
    }
}

async function updatePatient(id, name, birth, sex) {
    return await prisma.patient.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: name != '' ? name : undefined,
            birth: birth != '' ? (new Date(birth)).toISOString() : undefined,
            sex: sex != '' ? sex : undefined
        }
    })
}

async function createPatient(name, phone, birth, sex) {
    return await prisma.patient.create({
        data: {
            name,
            phone,
            sex,
            birth: (new Date(birth)).toISOString()
        }
    })
}

async function deletePatient(id) {
    id = parseInt(id);
    const totalCharge = (await prisma.visit.aggregate({
        where: {
            patient_id: id,
        },
        _sum: {
            charge: true
        },
    }))._sum.charge;
    const paymentAmount = (await prisma.payment.aggregate({
        where: {
            patient_id: id,
        },
        _sum: {
            amount: true
        }
    }))._sum.amount;

    if(paymentAmount < totalCharge){
        let error = new Error("Has Bills");
        error.meta = { code: "400", error: 'Patient has unpayed bills' };
        throw error;
    }

    return await prisma.patient.update({
        where:{
            id
        },
        data:{
            status: "Deleted"
        }
    })
}

module.exports = {
    getPatientById,
    getPatientProfile,
    updatePatient,
    createPatient,
    deletePatient
};