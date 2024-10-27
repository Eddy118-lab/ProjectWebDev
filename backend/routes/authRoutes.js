const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController.js');
const { registerValidation, loginValidation } = require('../middlewares/userValidation.js');
const { validationResult } = require('express-validator');

const router = express.Router();

router.post('/register', registerValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    registerUser(req, res, next);
});

router.post('/login', loginValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    loginUser(req, res, next);
});

module.exports = router;
