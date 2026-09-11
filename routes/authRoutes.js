const express = require('express');
const router = express.Router();
const { register,login } = require('../controllers/authControllers');

// POST - Registrar nuevo usuario
router.post('/register', register);
router.post('/login', login); 
const { proteger } = require('../middleware/authMiddleware');
const { autorizar } = require('../middleware/roleMiddleware');

// TEMPORAL - quitar despues - mientras se hacen pruebas
/*router.post('/crear-admin', async (req, res) => {
    try {
        const User = require('../models/user');
        const { name, email, password } = req.body;

        const usuario = await User.create({
            name,
            email,
            password,
            rol: 'admin'  // forzamos rol admin
        });

        res.status(201).json({
            exitoso: true,
            mensaje: 'Admin creado',
            usuario: {
                id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({
            exitoso: false,
            error: error.message
        });
    }
});*/

module.exports = router;