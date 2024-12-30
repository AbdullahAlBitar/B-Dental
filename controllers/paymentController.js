const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const paymentService = require('../services/paymentService');

const getPayments = async (req, res) => {
  const payments = await paymentService.getAll();
  console.log(`Payments , found`);

  return res.status(200).json(payments);
};

const getPaymentById = async (req, res) => {
  const { id } = req.params;
  const payment = await paymentService.getPaymentById(id);
  console.log(`Payment Id : ${payment.id}, found`);

  return res.status(200).json(payment);
};

const getPaymentProfile = async (req, res) => {
  const id = req.params.id;
  
  const paymentProfile = await paymentService.getPaymentProfile(id);
  console.log(`Payment profile Id : ${paymentProfile.id}, found`);

    
  return res.status(200).json(paymentProfile);
};

const createPayment = async (req, res) => {
  const id = req.user.id;
  const { patient_id ,phone, amount, date } = req.body;
  
  const newPayment = await paymentService.createPayment(patient_id, phone, id, amount, date);
  console.log(`New Payment Id : ${newPayment.id}, created`);
  
  return res.status(200).json(newPayment.id);
};

const updatePayment = async (req, res) => {
  const id = req.params.id;
  const { amount, date } = req.body;
  
  const updatedPayment = await paymentService.updatePayment(id, amount, date);
  console.log(`Payment Id : ${updatePayment.id}, updated`);
  
  return res.status(200).json(updatedPayment.id);
};

const deletePayment = async (req, res) =>{
  const id = req.params.id;
  const deletedPayment = await paymentService.deletePayment(id);
  console.log(`Payment Id : ${deletedPayment.id}, deleted`);

  return res.status(200).json(deletedPayment.id);
}

module.exports = {
  getPayments,
  getPaymentById,
  getPaymentProfile,
  createPayment,
  updatePayment,
  deletePayment
};