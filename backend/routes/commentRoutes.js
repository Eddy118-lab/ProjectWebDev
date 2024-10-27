// routes/commentRoutes.js
const express = require('express');
const { createComment, getCommentsByPost, deleteComment } = require('../controllers/commentController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Crear un comentario en una publicación
router.post('/:postId', authMiddleware, createComment);

// Obtener comentarios de una publicación específica
router.get('/:postId', getCommentsByPost);

// Eliminar un comentario específico
router.delete('/:commentId', authMiddleware, deleteComment);

module.exports = router;
