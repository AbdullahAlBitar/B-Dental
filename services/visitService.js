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
    }
}

module.exports = {
    getVisitById,
    getVisitProfile
};