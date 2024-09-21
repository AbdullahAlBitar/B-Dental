const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.get('/', doctorController.getDoctors);
router.post('/', doctorController.getDoctorById);
router.post('/profile', doctorController.getDoctorProfile);
router.get('/:id/edit', doctorController.getEditDoctorForm);
router.post('/', doctorController.createDoctor);
router.post('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
