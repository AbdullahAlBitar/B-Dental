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

module.exports = {
  getVisits,
  getVisitById,
  getVisitProfile,
};