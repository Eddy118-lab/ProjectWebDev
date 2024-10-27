const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getUser, updateUser, deleteUser } = require('../controllers/userController.js');
const { updateUserValidation } = require('../middlewares/userValidation');
const { validationResult } = require('express-validator');

const router = express.Router();

// Ruta para obtener datos del usuario autenticado
router.get('/me', authMiddleware, getUser);

// Ruta para actualizar datos del usuario
router.put('/update', authMiddleware, updateUserValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    updateUser(req, res, next);
});

// Ruta para eliminar la cuenta de usuario
router.delete('/delete', authMiddleware, deleteUser);

module.exports = router;
