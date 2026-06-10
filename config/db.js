const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
        const conexion = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexión a la base de datos exitosa');
        return conexion;
    }catch(error){
        console.error('Error al conectar a la base de datos:',error.message);
        process.exit(1);
    }
};  
    module.exports=connectDB;