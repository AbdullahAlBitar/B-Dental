const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const patientService = require('../services/patientService');

const getPatients = async (req, res) => {
  const patients = await prisma.patient.findMany();
  console.log(`Patients , found`);

  return res.status(200).json(patients);
};

const getPatientById = async (req, res) => {
  const { id } = req.params;
  const patient = await patientService.getPatientById(id);
  console.log(`Patient Id : ${patient.id}, found`);

  return res.status(200).json(patient);
};

const getPatientProfile = async (req, res) => {
  const id = req.params.id;
  
  const patientProfile = await patientService.getPatientProfile(id);
  console.log(`Patient profile Id : ${id}, found`);
    
  return res.status(200).json(patientProfile);
};

const updatePatient = async (req, res) => {
  const id = req.params.id;
  const { name, birth, sex } = req.body;

  const updatedPatient = await patientService.updatePatient(id, name, birth, sex);
  console.log(`Patient Id : ${updatePatient.id}, updated`);

  return res.status(200).json(updatedPatient.id);
}

const createPatient = async (req, res) => {
  const { name, phone, birth, sex } = req.body;

  const newPatient = await patientService.createPatient(name, phone, birth, sex);
  console.log(`New Patient Id : ${newPatient.id}, created`);

  return res.status(200).json(newPatient.id);
}

const deletePatient = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedPatient = await patientService.deletePatient(id);
    console.log(`Patient Id : ${deletedPatient.id}, deleted`);

    return res.status(200).json(deletedPatient.id);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getPatients,
  getPatientById,
  getPatientProfile,
  updatePatient,
  createPatient,
  deletePatient
};