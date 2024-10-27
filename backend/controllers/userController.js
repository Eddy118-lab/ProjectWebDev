const User = require('../models/User.js');

// Obtener datos del usuario autenticado
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error en getUser:', error); // Agrega un log para los errores
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Actualización de usuario
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const updates = req.body;
        Object.keys(updates).forEach(key => {
            if (updates[key] !== undefined) {
                user[key] = updates[key];
            }
        });

        await user.save();
        res.json({ msg: 'Usuario actualizado correctamente', user });
    } catch (error) {
        console.error('Error en updateUser:', error); // Agrega un log para los errores
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        await User.findByIdAndDelete(req.userId);
        res.json({ msg: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error en deleteUser:', error); // Agrega un log para los errores
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

module.exports = {
    getUser,
    updateUser,
    deleteUser,
};
