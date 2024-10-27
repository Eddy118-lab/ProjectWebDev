// controllers/commentController.js
const Comment = require('../models/Comment.js');
const Post = require('../models/Post.js');

// Crear un comentario
const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        const newComment = new Comment({
            post: postId,
            user: req.userId,
            content,
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error en createComment:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Obtener comentarios de un post
const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });
        
        res.json(comments);
    } catch (error) {
        console.error('Error en getCommentsByPost:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Eliminar un comentario
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        if (comment.user.toString() !== req.userId) {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar este comentario' });
        }

        await comment.remove();
        res.json({ msg: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.error('Error en deleteComment:', error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

module.exports = { createComment, getCommentsByPost, deleteComment };
