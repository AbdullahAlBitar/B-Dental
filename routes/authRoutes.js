const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validationMiddleware');
const { signInSchema } = require('./validationSchemas');

router.post('/login', validate(signInSchema), authController.login);
router.get('/logout', authController.logout);

module.exports = router;
