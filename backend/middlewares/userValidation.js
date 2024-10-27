const { body } = require('express-validator');

const registerValidation = [
    body('fullname')
        .trim()
        .isLength({ min: 25, max: 255 })
        .withMessage('El nombre debe tener entre 25 y 255 caracteres.'),
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres.'),
    body('email')
        .isEmail()
        .withMessage('Debe ser un correo electrónico válido.')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres.')
];

const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Debe ser un correo electrónico válido.')
        .normalizeEmail(),
    body('password')
        .not()
        .isEmpty()
        .withMessage('La contraseña es obligatoria.')
];

const updateUserValidation = [
    body('fullname')
        .optional()
        .trim()
        .isLength({ min: 25, max: 255 })
        .withMessage('El nombre debe tener entre 25 y 255 caracteres.'),
    body('username')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres.'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Debe ser un correo electrónico válido.')
        .normalizeEmail(),
    body('bio')
        .optional()
        .isLength({ max: 160 })
        .withMessage('La biografía no puede tener más de 160 caracteres.')
];

module.exports = {
    registerValidation,
    loginValidation,
    updateUserValidation
};
