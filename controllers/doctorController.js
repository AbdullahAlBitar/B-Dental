const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const doctorService = require('../services/doctorService');

const getDoctorById = async (req, res) => {
  const { id } = req.user;
  const doctor = await doctorService.getDoctorById(id);
  console.log(`Doctor Id : ${doctor.id}, found`);
  
  return res.status(200).json(doctor);
};

const getDoctorProfile = async (req, res) => {
  const { id } = req.user;
  
  const doctorProfile = await doctorService.getDoctorProfile(id);
  console.log(`Doctor profile Id : ${id}, profile found`);
  
  return res.status(200).json(doctorProfile);
};

module.exports = {
  getDoctorById,
  getDoctorProfile,
};
