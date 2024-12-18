const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getVisitById(id) {
    return await prisma.visit.findUnique({
        where: {
            id: parseInt(id),
        },
    });
}

async function getVisitProfile(id) {
    const visit = await prisma.visit.findUnique({
        where: {
            id: parseInt(id),
        },
        include : {
            Doctor :{
                select: {
                    name: true
                }
            },
            patient: {
                select: {
                    name: true,
                    sex: true,
                    phone: true
                }
            }
        }
    });
    if (!visit) return null;

    const casePhotos = await prisma.casephoto.findMany({
        where:{
            visit_id : parseInt(id)
        },
        select: {
            id: true,
            date: true,
            imageUrl: true,
            type: true
        }
    })

    return {
        name: visit.name,
        description: visit.description,
        charge: visit.charge,
        date: visit.date,
        doctor_name: visit.Doctor.name,
        patient_id: visit.patient_id,
        patient_name: visit.patient.name,
        patient_sex: visit.patient.sex,
        patient_phone: visit.patient.phone,
        case_photos: casePhotos
    }
}

async function createVisit(patient_id, phone, id, name, charge, date, description) {
    if(patient_id == undefined){
        const patient = await prisma.patient.findUnique({
            where: { phone: phone }
        });
    
        if (!patient) {
            let error = new Error("Not Found");
            error.meta = { code: "404", error: `No patient found with phone number: ${phone}` };
            throw error;
        }
        patient_id = patient.id;
    }
    return await prisma.visit.create({
        data: {
            patient_id: parseInt(patient_id),
            doctor_id: parseInt(id),
            name,
            charge: parseFloat(charge),
            date: new Date(date).toISOString(),
            description
        }
    })
}
async function updateVisit(id, name,description, charge, date) {
    return await prisma.visit.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name,
            description,
            charge: parseFloat(charge),
            date: new Date(date).toISOString(),
        }
    })
}

async function deleteVisit(id) {
    id = parseInt(id);
    await prisma.casephoto.deleteMany({
        where:{
            visit_id: id
        }
    });

    return await prisma.visit.delete({
        where: {
            id
        }
    });
}

module.exports = {
    getVisitById,
    getVisitProfile,
    createVisit,
    updateVisit,
    deleteVisit
};