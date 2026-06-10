const Customer= require('../models/customer');
//get ---obtener todos los clientes
exports.getAllCustomers=async(req,res)=>{
    try{
        const customers=await Customer.find();
        res.status(200).json({
        exitoso:true,
        cantidad:customers.length,
        data:customers});
    }catch(error){
        res.status(500).json({
            exitoso:false,
            mensaje:'Error al obtener los clientes',
            error:error.message 

        });
    }
};
//get by id ---obtener un cliente por id
exports.getCustomerById=async(req,res)=>{
    try{
        const {id}= req.params;
        
        const customer=await Customer.findById(id);
        if(!customer){
            return res.status(404).json({
                exitoso:false,
                mensaje:'Cliente no encontrado'
            });
        }       res.status(200).json({  
            exitoso:true,
            data:customer            
            });
    }catch(error){
        res.status(500).json({
            exitoso:false,
            mensaje:'Error al obtener el cliente',
            error:error.message 
        })
    };
};
// post ---crear un nuevo cliente
exports.createCustomer=async(req,res)=>{
    try{
        const{name, email, phone, city}=req.body;

        //crear un nuevo cliente
        const newCustomer= new Customer({
            name,email,phone,city
        });
        
        //guardar el cliente en la base de datos
        const savedCustomer=await newCustomer.save();
        res.status(201).json({
            exitoso:true,
            mensaje:'Cliente creado exitosamente',
            data:savedCustomer
        });
    }catch(error){
        res.status(400).json({
            exitoso:false,
            mensaje:'Error al crear el cliente',
            error:error.message 
        })
    }
};
//put --- actualizar un cliente existente
exports.updateCustomer=async(req,res)=>{
    try{
        const {id}=req.params;
        const dataUpdate=req.body;

        const updateCliet= await Customer.findByIdAndUpdate(
            id,
            dataUpdate,
            {new:true, runValidators:true}
        );
        if(!updateCliet){
            return res.status(404).json({
                exitoso:false,
                mensaje:'Cliente no encontrado'
            });
        }
        res.status(200).json({
            exitoso:true,
            mensaje:'Cliente actualizado exitosamente',
            data:updateCliet
        });
    }catch(error){
        res.status(400).json({
            exitoso:false,
            mensaje:'Error al actualizar el cliente',
            error:error.message
        });
    }
};
//Delete --- eliminar un cliente

exports.deleteCustomer=async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteCustomer=await Customer.findByIdAndDelete(id);
        if(!deleteCustomer){
            return res.status(404).json({
                exitoso:false,
                mensaje:'Cliente no encontrado'
            });
        };
        res.status(200).json({
            exitoso:true,
            mensaje:'cliente eliminado exitosamente',
            data:deleteCustomer

        });

    } catch(error){
        res.status(500).json({
            exitoso:false,
            mensaje:'Error al eliminar el cliente',
            error:error.message
        });
    }
}

            
