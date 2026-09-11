const User=require('../models/user');
const jwt = require('jsonwebtoken');

//  Función auxiliar: generar un token JWT
const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario._id, rol: usuario.rol },   // payload
    process.env.JWT_SECRET,                   // clave secreta
    { expiresIn: process.env.JWT_EXPIRES_IN } // expiración
  );
};
//post/register
exports.register=async(req,res)=>{
    try{
        const{name,email, password}=req.body;
        //validacion de datos
        if(!name||!email||!password){
            return res.status(400).json({
                exitoso:false,
                mensaje:'nombre,email y contraseña requeridos'
            });
        }
        //verificar si el usuario ya esta registrado
        const usuarioExiste=await User.findOne({email});
            if (usuarioExiste){
                return res.status(400).json({
                    exitoso: false,
                    mensaje:'Este email ya esta registrado'
                })
            }
        //crear el usuario(el hook cifra la contraseña)
        const usuario=await User.create({
            name, 
            email,
            password
        });

        //generar token
        const token= generarToken(usuario);

        //responder(sin enviar la contraseña)
        res.status(201).json({
            exitoso:true,
            mensaje:'usuario registrado con exito',
            token, 
            usuario:{
                id:usuario._id,
                name:usuario.name,
                email:usuario.email,
                rol:usuario.rol

            }
        })
    
    }
    catch(error){
        res.status(500).json({
            exitoso:false,
            mensaje:'error al registar usuario',
            error:error.message
        });
    }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validar datos
    if (!email || !password) {
      return res.status(400).json({
        exitoso: false,
        mensaje: 'Email y contraseña son requeridos'
      });
    }

    // 2. Buscar el usuario INCLUYENDO el password
    //    (recuerda que pusimos select: false en el modelo)
    const usuario = await User.findOne({ email }).select('+password');

    // 3. Si no existe, error genérico (no revelar qué falló)
    if (!usuario) {
      return res.status(401).json({
        exitoso: false,
        mensaje: 'Credenciales inválidas'
      });
    }

    // 4. Comparar la contraseña con el método del modelo
    const passwordCorrecta = await usuario.compararPassword(password);
    if (!passwordCorrecta) {
      return res.status(401).json({
        exitoso: false,
        mensaje: 'Credenciales inválidas'
      });
    }

    // 5. Todo bien: generar token
    const token = generarToken(usuario);

    // 6. Responder con el token
    res.status(200).json({
      exitoso: true,
      mensaje: 'Login exitoso',
      token,
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
      mensaje: 'Error al iniciar sesión',
      error: error.message
    });
  }
};