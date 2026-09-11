const jwt = require('jsonwebtoken');
const User = require('../models/user');

const proteger = async (req, res, next) => {
    try {
        // 1. Verificar que venga el token en el header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                exitoso: false,
                mensaje: 'No autorizado, token no proporcionado'
            });
        }

        // 2. Extraer el token
        const token = authHeader.split(' ')[1];

        // 3. Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Buscar el usuario en la BD y adjuntarlo al request
        req.usuario = await User.findById(decoded.id);

        if (!req.usuario) {
            return res.status(401).json({
                exitoso: false,
                mensaje: 'Usuario no encontrado'
            });
        }

        next(); // ✅ todo bien, continuar
    } catch (error) {
        return res.status(401).json({
            exitoso: false,
            mensaje: 'Token inválido o expirado',
            error: error.message
        });
    }
};

module.exports = { proteger };