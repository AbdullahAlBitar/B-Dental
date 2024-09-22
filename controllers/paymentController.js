const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const paymentService = require('../services/paymentService');

const getPayments = async (req, res) => {
  const payments = await prisma.payment.findMany();
  return res.status(200).json(payments);
};

const getPaymentById = async (req, res) => {
  const { id } = req.user;
  const payment = await paymentService.getPaymentById(parseInt(id));
  return res.status(200).json(payment);
};

const getPaymentProfile = async (req, res) => {
  const id = req.params.id;
  
  const paymentProfile = await paymentService.getPaymentProfile(parseInt(id));
  //console.log("payment profile : ", paymentProfile);
    
  return res.status(200).json(paymentProfile);
};

module.exports = {
  getPayments,
  getPaymentById,
  getPaymentProfile,
};