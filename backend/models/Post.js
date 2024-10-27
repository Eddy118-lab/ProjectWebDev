const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo de Usuario
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 500, // Limitar la longitud del contenido
    },
    image: {
        type: String,
        default: null, // URL de la imagen, si se sube
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Referencia a los usuarios que dieron like
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Referencia al modelo de Usuario
            required: true
        },
        content: {
            type: String,
            required: true,
            maxlength: 200, // Limitar la longitud de los comentarios
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
