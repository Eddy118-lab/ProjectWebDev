// validations/postValidation.js
const { check, validationResult } = require('express-validator');

// Validaciones para crear un post
const validatePost = [
    check('content')
        .notEmpty().withMessage('El contenido es obligatorio')
        .isLength({ max: 500 }).withMessage('El contenido no puede exceder los 500 caracteres'),
    check('image')
        .optional().isURL().withMessage('La URL de la imagen no es válida'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validatePost };
