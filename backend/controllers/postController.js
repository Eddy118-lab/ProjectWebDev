const Post = require('../models/Post.js');

// Crear una nueva publicación
const createPost = async (req, res) => {
    try {
        const { content, image } = req.body;

        const newPost = new Post({
            user: req.userId,
            content,
            image,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Obtener todas las publicaciones
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username').populate('likes', 'username').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Actualizar una publicación
const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        if (post.user.toString() !== req.userId) {
            return res.status(403).json({ msg: 'No tienes permiso para editar esta publicación' });
        }

        post.content = req.body.content || post.content;
        post.image = req.body.image || post.image;

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Eliminar una publicación
const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        if (post.user.toString() !== req.userId) {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar esta publicación' });
        }

        await post.remove();
        res.json({ msg: 'Publicación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

module.exports = { createPost, getPosts, updatePost, deletePost };
