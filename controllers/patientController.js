const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const patientService = require('../services/patientService');

const getPatients = async (req, res) => {
  const patients = await prisma.patient.findMany();
  return res.status(200).json(patients);
};

const getPatientById = async (req, res) => {
  const { id } = req.user;
  const patient = await patientService.getPatientById(parseInt(id));
  return res.status(200).json(patient);
};

const getPatientProfile = async (req, res) => {
  const id = req.params.id;
  
  const patientProfile = await patientService.getPatientProfile(parseInt(id));
  //console.log("patient profile : ", patientProfile);
    
  return res.status(200).json(patientProfile);
};

module.exports = {
  getPatients,
  getPatientById,
  getPatientProfile,
};