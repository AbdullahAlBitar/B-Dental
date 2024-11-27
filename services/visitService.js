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
            data: new Date(date).toISOString(),
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
            data: new Date(date).toISOString(),
        }
    })
}

module.exports = {
    getVisitById,
    getVisitProfile,
    createVisit,
    updateVisit
};