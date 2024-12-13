const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const visitService = require('../services/visitService');

const getVisits = async (req, res) => {
  const visits = await prisma.visit.findMany();
  return res.status(200).json(visits);
};

const getVisitById = async (req, res) => {
  const { id } = req.user;
  const visit = await visitService.getVisitById(id);
  return res.status(200).json(visit);
};

const getVisitProfile = async (req, res) => {
  const id = req.params.id;
  
  const visitProfile = await visitService.getVisitProfile(id);
  //console.log("visit profile : ", visitProfile);
    
  return res.status(200).json(visitProfile);
};

const createVisit = async (req, res) => {
  const id = req.user.id;
  const { patient_id ,phone, name, description, date, charge } = req.body;
  
  const newVisit = await visitService.createVisit(patient_id, phone, id, name, charge, date, description);
  
  return res.status(200).json(newVisit.id);
};
const updateVisit = async (req, res) => {
  const id = req.params.id;
  const { name, description, charge, date } = req.body;
  
  const updatedVisit = await visitService.updateVisit(id, name,description, charge, date);
  
  return res.status(200).json(updatedVisit.id);
};

module.exports = {
  getVisits,
  getVisitById,
  getVisitProfile,
  createVisit,
  updateVisit
};