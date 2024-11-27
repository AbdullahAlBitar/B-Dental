const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const paymentService = require('../services/paymentService');

const getPayments = async (req, res) => {
  const payments = await paymentService.getAll();
  return res.status(200).json(payments);
};

const getPaymentById = async (req, res) => {
  const { id } = req.params;
  const payment = await paymentService.getPaymentById(id);
  return res.status(200).json(payment);
};

const getPaymentProfile = async (req, res) => {
  const id = req.params.id;
  
  const paymentProfile = await paymentService.getPaymentProfile(id);
  //console.log("payment profile : ", paymentProfile);
    
  return res.status(200).json(paymentProfile);
};

const createPayment = async (req, res) => {
  const id = req.user.id;
  const { patient_id ,phone, amount, date } = req.body;
  
  const newPayment = await paymentService.createPayment(patient_id, phone, id, amount, date);
  
  return res.status(200).json(newPayment.id);
};

const updatePayment = async (req, res) => {
  const id = req.params.id;
  const { amount, date } = req.body;
  
  const updatedPayment = await paymentService.updatePayment(id, amount, date);
  
  return res.status(200).json(updatedPayment.id);
};

module.exports = {
  getPayments,
  getPaymentById,
  getPaymentProfile,
  createPayment,
  updatePayment
};