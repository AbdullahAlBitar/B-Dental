const express = require('express');
const patientController = require('../controllers/patientController');
const { validate } = require('../middleware/validationMiddleware');
const { patientCreate, patientUpdate } = require('./validationSchemas');

const router = express.Router();

router.get('/', patientController.getPatients);
router.post('/',validate(patientCreate), patientController.createPatient);
router.get('/:id', patientController.getPatientById);
router.patch('/:id',validate(patientUpdate), patientController.updatePatient);
router.get('/profile/:id', patientController.getPatientProfile);
// router.get('/:id/edit', patientController.getEditPatientForm);
// router.post('/', patientController.createPatient);
// router.delete('/:id', patientController.deletePatient);

module.exports = router;
