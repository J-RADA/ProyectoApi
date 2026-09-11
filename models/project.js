const mongoose=require('mongoose');
const projectSchema=new mongoose.Schema({
    projectName:{
        type:String,
        required:[true,'nombre del proyecto obligatorio'],
},
    productionDate:{
        type:Date,
        required:[true,'fecha de producción obligatoria']
    },
    typeOfProject:{
        type:String,
        enum:['closet','cocina', 'muebleBaño', 'puertas'],
        required:[true,'tipo de proyecto obligatorio']
    },
    city:{
        type:String,
        required:[true,'ciudad obligatoria']
    },
   price:{
    type:Number,
    required:[true,'precio obligatorio']
    },
    estado:{
    type:String,
    enum:['cotizacion','diseño','fabricacion','proximaInstalar','instalando','finalizado'],
    default:'cotizacion'
   },

},{timestamps:true});
module.exports=mongoose.model('project',projectSchema);