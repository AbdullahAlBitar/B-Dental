const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.post('/', doctorController.getDoctorById);
router.post('/profile', doctorController.getDoctorProfile);

module.exports = router;
