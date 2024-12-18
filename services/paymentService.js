const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAll(id) {
    return await prisma.payment.findMany({
        include: {
            Doctor: {
                select: {
                    name:true
                }
            },
            patient: {
                select: {
                    name: true
                }
            }
        }
    });
}

async function getPaymentById(id) {
    return await prisma.payment.findUnique({
        where: {
            id: parseInt(id),
        },
    });
}

async function getPaymentProfile(id) {
    const payment = await prisma.payment.findUnique({
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
    if (!payment) return null;

    return {
        amount: payment.amount,
        date: payment.date,
        doctor_name: payment.Doctor.name,
        patient_id: payment.patient_id,
        patient_name: payment.patient.name,
        patient_sex: payment.patient.sex,
        patient_phone: payment.patient.phone,
    }
}

async function createPayment(patient_id, phone, doctor_id, amount, date) {
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
    return await prisma.payment.create({
        data: {
            patient_id: patient_id,
            doctor_id: parseInt(doctor_id),
            amount: parseFloat(amount),
            date: new Date(date).toISOString()
        }
    });
}

async function updatePayment(id, amount, date) {
    return await prisma.payment.update({
        where: {
            id: parseInt(id)
        },
        data: {
            amount: amount ? parseFloat(amount) : undefined,
            date: date ? new Date(date).toISOString() : undefined
        }
    });
}

async function deletePayment(id) {
    id = parseInt(id);
    return await prisma.payment.delete({
        where: {
            id
        }
    })
}

module.exports = {
    getPaymentById,
    getPaymentProfile,
    getAll,
    createPayment,
    updatePayment,
    deletePayment
};