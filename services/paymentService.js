const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getPaymentById(id) {
    return await prisma.payment.findUnique({
        where: {
            id,
        },
    });
}

async function getPaymentProfile(id) {
    const payment = await prisma.payment.findUnique({
        where: {
            id,
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

module.exports = {
    getPaymentById,
    getPaymentProfile
};