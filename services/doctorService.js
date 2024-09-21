const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


async function login(phone, password) {
    const doctor = await prisma.doctor.findUnique({
        where: {
            phone,
        },
    });

    if(!doctor) {
        return null;
    }

    if(bcrypt.compare(password, doctor.password)) {
        return doctor;
    }else {
        return null;
    }
}

async function getDoctorById(id) {
    return await prisma.doctor.findUnique({
        where: {
            id,
        },
    });
}

async function getDoctorProfile(id) {
    const doctor = await prisma.doctor.findUnique({
        where: {
            id,
        },
    });
    if(!doctor) return null;
    const visits = await prisma.visit.findMany({
        where: {
            doctor_id: id,
        },
        select: {
            id: true,
            name: true,
            charge: true,
            date: true,
        }
    });
    const totalCharge = (await prisma.visit.aggregate({
        where: {
            doctor_id: id,
        },
        _sum: {
            charge: true
        },
    }))._sum.charge;
    const payments = (await prisma.payment.aggregate({
        where: {
            doctor_id: id,
        },
        _sum: {
            amount: true
        }
    }))._sum.amount;

    return {
        name: doctor.name,
        phone: doctor.phone,
        dues: (totalCharge - payments) || 0,
        visits : visits || []
    }
}

module.exports = {
    login,
    getDoctorById,
    getDoctorProfile
};