const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
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
        trim: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'email no válido']
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria'],
        minlength:[6,'la contraseña debe terner minimo 6 caracteres'],
        select:false
    },
    rol:{
        type:String,
        enum:['usuario','admin'],
        default:'usuario'
    }

},{timestamps:true});
// hook: se ejecuta antes de de guardar (pre'save')
userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return ;
    }
    //generar salt y hashear
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    });
//metodo para comparar contraseñas en el login
userSchema.methods.compararPassword=async function(passwordIngresada){
    return await bcrypt.compare(passwordIngresada,this.password);
}

module.exports=mongoose.model('user',userSchema);