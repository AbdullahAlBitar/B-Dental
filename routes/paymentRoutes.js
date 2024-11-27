const express = require('express');
const { validate } = require('../middleware/validationMiddleware');
const { paymentCreate, paymentUpdate } = require('./validationSchemas');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.get('/', paymentController.getPayments);
router.post('/',validate(paymentCreate), paymentController.createPayment);
router.get('/:id', paymentController.getPaymentById);
router.get('/profile/:id', paymentController.getPaymentProfile);
// router.post('/:id', validate(paymentCreate), paymentController.createPayment); ??????????
router.patch('/:id', validate(paymentUpdate), paymentController.updatePayment);
// router.get('/:id/edit', paymentController.getEditPaymentForm);
// router.post('/', paymentController.createPayment);
// router.post('/:id', paymentController.updatePayment);
// router.delete('/:id', paymentController.deletePayment);

module.exports = router;
