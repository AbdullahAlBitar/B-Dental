const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validationMiddleware');
const { signInSchema, signUpSchema } = require('./validationSchemas');
const authenticateJWT = require('../middleware/authMiddleware');

router.post('/login', validate(signInSchema), authController.login);
// router.post('/signup', validate(signUpSchema), authController.register);
router.get('/token', authenticateJWT, authController.token);
router.get('/logout', authController.logout);

module.exports = router;
