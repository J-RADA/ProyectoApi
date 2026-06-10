const mongoose = require('mongoose');
const { type } = require('node:os');
const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'nombre obligatorio'],
        trim :true,
        minlength:[5,'el nombre debe tener al menos 5 caracteres'],
        maxlength:[50,'el nombre debe tener como máximo 50 caracteres']
    },
    email:{
        type:String,
        required:[true,'email obligatorio'],
        unique:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'email no válido']
    },
    phone:{
        type:String,
        required:[true,'teléfono obligatorio']
    },
    city:{
        type:String,
        required:[true,'ciudad obligatoria']
    },
    dataCreated:{
        type:Date,
        default:Date.now
    },
    
},{timestamps:true})

module.exports=mongoose.model('Customer',customerSchema)    ;