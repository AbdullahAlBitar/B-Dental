const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAll() {
    return await prisma.casephoto.findMany({
        include: {
            visit: true,
            patient: {
                select: {
                    name: true
                }
            }
        }
    });
}

async function getPhotoById(id) {
    return await prisma.casephoto.findUnique({
        where: {
            id: parseInt(id),
        },
    });
}

async function getPhotosByVisit(visitId) {
    return await prisma.casephoto.findMany({
        where: {
            visit_id: parseInt(visitId)
        },
        include: {
            visit: true,
            patient: {
                select: {
                    name: true
                }
            }
        }
    });
}

async function getPhotosByPatient(patientId) {
    return await prisma.casephoto.findMany({
        where: {
            patient_id: parseInt(patientId)
        },
        include: {
            visit: true,
            patient: {
                select: {
                    name: true
                }
            }
        }
    });
}

async function uploadPhoto(patientId, visitId, photoUrl, type, date) {
    return await prisma.casephoto.create({
        data: {
            patient_id: parseInt(patientId),
            visit_id: parseInt(visitId),
            imageUrl: photoUrl,
            type,
            date: date ? new Date(date).toISOString() : new Date(Date.now()).toISOString()
        }
    });
}

async function deletePhoto(id) {
    id = parseInt(id);
    // TODO :: delete from cloude
    return await prisma.casephoto.delete({
        where:{
            id
        }
    })
}

module.exports = {
    getAll,
    getPhotoById,
    getPhotosByVisit,
    getPhotosByPatient,
    uploadPhoto,
    deletePhoto
};