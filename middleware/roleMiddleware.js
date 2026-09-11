const autorizar = (...rolesPermitidos) => {
    return (req, res, next) => {
        // req.usuario viene del middleware proteger (paso 1)
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                exitoso: false,
                mensaje: `Acceso denegado. Se requiere rol: ${rolesPermitidos.join(' o ')}`
            });
        }
        next(); // ✅ tiene el rol correcto, continuar
    };
};

module.exports = { autorizar };