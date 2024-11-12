const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.get('/', doctorController.getDoctorById);
router.get('/profile', doctorController.getDoctorProfile);

module.exports = router;
