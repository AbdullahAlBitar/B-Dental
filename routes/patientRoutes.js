const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/', patientController.getPatients);
router.post('/:id', patientController.getPatientById);
router.patch('/:id', patientController.updatePatient);
router.post('/profile/:id', patientController.getPatientProfile);
// router.get('/:id/edit', patientController.getEditPatientForm);
// router.post('/', patientController.createPatient);
// router.delete('/:id', patientController.deletePatient);

module.exports = router;
