const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const patientService = require('../services/patientService');

const getPatients = async (req, res) => {
  const patients = await prisma.patient.findMany();
  return res.status(200).json(patients);
};

const getPatientById = async (req, res) => {
  const { id } = req.params;
  const patient = await patientService.getPatientById(id);
  return res.status(200).json(patient);
};

const getPatientProfile = async (req, res) => {
  const id = req.params.id;
  
  const patientProfile = await patientService.getPatientProfile(id);
  //console.log("patient profile : ", patientProfile);
    
  return res.status(200).json(patientProfile);
};

const updatePatient = async (req, res) => {
  const id = req.params.id;
  const { name, birth, sex } = req.body;

  const updatedPatient = await patientService.updatePatient(id, name, birth, sex);

  return res.status(200).json(updatedPatient.id);
}

module.exports = {
  getPatients,
  getPatientById,
  getPatientProfile,
  updatePatient
};