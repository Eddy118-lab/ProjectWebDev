const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtener el encabezado Authorization
    const token = req.header('Authorization');

    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    // Extraer el token del formato 'Bearer <token>'
    const tokenWithoutBearer = token.replace('Bearer ', '');

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        // Asociar el ID del usuario a la solicitud
        req.userId = decoded.userId; 
        next(); // Pasar al siguiente middleware o ruta
    } catch (error) {
        // Si el token no es válido
        res.status(401).json({ msg: 'Token no válido' });
    }
};

module.exports = authMiddleware;
