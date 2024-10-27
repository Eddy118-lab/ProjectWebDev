// routes/postRoutes.js
const express = require('express');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const { validatePost } = require('../middlewares/postValidation.js');

const router = express.Router();

// Crear una nueva publicación
router.post('/', authMiddleware, validatePost, createPost);

// Obtener todas las publicaciones
router.get('/', getPosts);

// Actualizar una publicación
router.put('/:postId', authMiddleware, validatePost, updatePost);

// Eliminar una publicación
router.delete('/:postId', authMiddleware, deletePost);

module.exports = router;
