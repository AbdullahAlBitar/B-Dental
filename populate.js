const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    // Delete all existing data in the database
    await prisma.payment.deleteMany({});
    await prisma.casephoto.deleteMany({});
    await prisma.visit.deleteMany({});
    await prisma.patient.deleteMany({});
    await prisma.doctor.deleteMany({});

    // Create 3 doctor records
    const doctors = await Promise.all([
        prisma.doctor.create({
            data: {
                name: 'Abdullah',
                phone: '0503547558',
                password: await bcrypt.hash("password", 10)
            },
        }),
        prisma.doctor.create({
            data: {
                name: 'Yousof',
                phone: '0551212164',
                password: await bcrypt.hash("password", 10)
            },
        }),
        prisma.doctor.create({
            data: {
                name: 'Ahmed',
                phone: '0123456789',
                password: await bcrypt.hash("password", 10)
            },
        })
    ]);

    // Create 5 patients for each doctor
    for (let i = 1; i <= 15; i++) {
        const patient = await prisma.patient.create({
            data: {
                name: `Patient ${i}`,
                phone: `555-555-${i.toString().padStart(4, '0')}`,
                birth: new Date(),
                sex: i % 2 === 0 ? 'Male' : 'Female',
            },
        });

        // Create 5 payments and visits for each patient
        for (let j = 1; j <= 5; j++) {
            const doctorIndex = Math.floor(Math.random() * 3);
            await prisma.payment.create({
                data: {
                    amount: parseFloat((Math.random() * 1000).toFixed(2)),
                    date: new Date(),
                    patient_id: patient.id,
                    doctor_id: doctors[doctorIndex].id,
                },
            });

            const visit = await prisma.visit.create({
                data: {
                    name: `Visit ${j}`,
                    date: new Date(),
                    doctor_id: doctors[doctorIndex].id,
                    patient_id: patient.id,
                    description: `Description for Visit ${j}`,
                    charge: parseFloat((Math.random() * 10000).toFixed(2)),
                },
            });

            // Add a case photo for each visit
            await prisma.casephoto.create({
                data: {
                    patient_id: patient.id,
                    visit_id: visit.id,
                    type: 'X-Ray',
                    imageUrl: `https://example.com/xray_${patient.id}_${visit.id}.jpg`,
                    date: new Date(),
                },
            });
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });