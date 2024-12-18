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

const createPatient = async (req, res) => {
  const { name, phone, birth, sex } = req.body;

  const newPatient = await patientService.createPatient(name, phone, birth, sex);

  return res.status(200).json(newPatient.id);
}

const deletePatient = async (req, res, next) => {
  try {
    const id = req.params.id;

    // if(patientService.hasBills(id)){
    //   let error = new Error("Has Bills");
    //   error.meta = { code: "400", error: 'Patient has unpayed bills' };
    //   throw error;
    // }
    const deletedPatient = await patientService.deletePatient(id);

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