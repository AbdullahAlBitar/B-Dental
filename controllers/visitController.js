const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const visitService = require('../services/visitService');

const getVisits = async (req, res) => {
  const visits = await prisma.visit.findMany();
  console.log(`Visits , found`);

  return res.status(200).json(visits);
};

const getVisitById = async (req, res) => {
  const { id } = req.user;
  const visit = await visitService.getVisitById(id);
  console.log(`Visit Id : ${visit.id}, found`);

  return res.status(200).json(visit);
};

const getVisitProfile = async (req, res) => {
  const id = req.params.id;
  
  const visitProfile = await visitService.getVisitProfile(id);
  console.log(`Visit profile Id : ${visitProfile.id}, found`);
    
  return res.status(200).json(visitProfile);
};

const createVisit = async (req, res) => {
  const id = req.user.id;
  const { patient_id ,phone, name, description, date, charge } = req.body;
  
  const newVisit = await visitService.createVisit(patient_id, phone, id, name, charge, date, description);
  console.log(`Visit Id : ${newVisit.id}, created`);
  
  return res.status(200).json(newVisit.id);
};
const updateVisit = async (req, res) => {
  const id = req.params.id;
  const { name, description, charge, date } = req.body;
  
  const updatedVisit = await visitService.updateVisit(id, name,description, charge, date);
  console.log(`Visit Id : ${updatedVisit.id}, updated`);
  
  return res.status(200).json(updatedVisit.id);
};
const deleteVisit = async (req, res)=>{
  const id = req.params.id;
  const deletedVisit = await visitService.deleteVisit(id);
  console.log(`Visit Id : ${deletedVisit.id}, deleted`);

  return res.status(200).json(deletedVisit.id);
}

module.exports = {
  getVisits,
  getVisitById,
  getVisitProfile,
  createVisit,
  updateVisit,
  deleteVisit
};