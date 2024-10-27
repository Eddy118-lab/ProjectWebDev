const express = require('express');
const connectDB = require('./database/db.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js'); // Importar rutas de usuario
const postRoutes = require('./routes/postRoutes.js'); // Importar rutas de publicaciones
const commentRoutes = require('./routes/commentRoutes.js');
const authMiddleware = require('./middlewares/authMiddleware.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
 connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app; 