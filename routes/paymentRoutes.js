const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.get('/', paymentController.getPayments);
router.post('/:id', paymentController.getPaymentById);
router.post('/profile/:id', paymentController.getPaymentProfile);
// router.get('/:id/edit', paymentController.getEditPaymentForm);
// router.post('/', paymentController.createPayment);
// router.post('/:id', paymentController.updatePayment);
// router.delete('/:id', paymentController.deletePayment);

module.exports = router;
