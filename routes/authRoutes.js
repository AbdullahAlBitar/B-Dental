const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validationMiddleware');
const { signInSchema, signUpSchema } = require('./validationSchemas');

router.post('/login', validate(signInSchema), authController.login);
router.post('/signup', validate(signUpSchema), authController.register);
router.get('/logout', authController.logout);

module.exports = router;
