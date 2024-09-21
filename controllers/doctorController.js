const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const doctorService = require('../services/doctorService');

const getDoctors = async (req, res) => {
  const doctors = await prisma.doctor.findMany();
  res.render('doctors/list', { doctors, title: 'Doctor List' });
};

const getDoctorById = async (req, res) => {
  const { id } = req.user;
  const doctor = await doctorService.getDoctorById(parseInt(id));
  return res.status(200).json(doctor);
};

const getDoctorProfile = async (req, res) => {
  const { id } = req.user;
  
  const doctorProfile = await doctorService.getDoctorProfile(parseInt(id));
  //console.log("doctor profile : ", doctorProfile);
  
  return res.status(200).json(doctorProfile);
};

const getCreateDoctorForm = (req, res) => {
  res.render('doctors/form', { doctor: {}, title: 'New Doctor' });
};

const getEditDoctorForm = async (req, res) => {
  const { id } = req.params;
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.render('doctors/form', { doctor, title: 'Edit Doctor' });
};

const createDoctor = async (req, res) => {
  const { name, phone, email, password } = req.body;
  const doctor = await prisma.doctor.create({
    data: {
      name,
      phone,
      email,
      password,
    },
  });
  res.redirect(`/doctors/${doctor.id}`);
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, phone, password } = req.body;
  console.log(req.body)
  const updatedDoctor = await prisma.doctor.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      phone,
      password,
    },
  });
  res.redirect(`/doctors/${updatedDoctor.id}`);
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  await prisma.doctor.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.redirect('/doctors');
};

module.exports = {
  getDoctors,
  getDoctorById,
  getDoctorProfile,
  getCreateDoctorForm,
  getEditDoctorForm,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
