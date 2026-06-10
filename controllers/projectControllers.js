const project= require('../models/project');
//get --- obtener todos los proyectos
exports.getAllProjects=async(req,res)=>{
    try{
        const projects=await project.find();
        res.status(200).json({
            exitoso:true,
            cantidad:projects.length,
            data:projects
    });
    }catch(error){
        res.status(500).json({
            exitoso:false,
            mensaje:'error al obtener proyectos',
            error:error.message
        })
    }
};
// get by id --- obtener un proyecto por categoria  
exports.getProjectById=async(req,res)=>{
    try{
        const {typeOfProject}=req.params;
        const projects=await project.find({typeOfProject:typeOfProject});
        res.status(200).json({
            exitoso:true,
            cantidad:projects.length,
            data:projects
        });
    }catch(error){
        res.status(500).json({
            exitoso:false,
            mensaje:'error al obtener el proyecto',
            error:error.message
        });

    }
}
// POST --- agregar un nuevo proyecto
exports.createNewProject=async(req,res)=>{
    try{
        const{projectName,productionDate,typeOfProject,city,price}=req.body;
        const newProject= new project({
            projectName,
            productionDate,
            typeOfProject,
            city,
            price
        });
        //guardar nuevo  el proyecto en la base de datos
        const savedProject=await newProject.save();
        res. status(201).json({
            exitoso: true,
            mensaje:'Proyecto creado exitosamente',
            data:savedProject       
        });
        }catch(error){
            res.status(500).json({
                exitoso:false,                mensaje:'Error al crear el proyecto',
                error:error.message
            })
        }
    }

// PUT --- actualizar un proyecto existente
exports.updateProject=async(req,res)=>{
    try{
        const {id}=req.params;
        const dataUpdate=req.body;
        const updatedProject=await project.findByIdAndUpdate(
            id,
            dataUpdate,
            {new:true,runValidators:true}
        );
            if(!updatedProject){
                return res.status(404).json({
                    exitoso:false,
                    mensaje:'projecto no encontrado'
                })
            }
        res.status(200).json({
            exitoso:true,
            mensaje:'proyecto actualizado exitosamente',
            data:updatedProject
        });
    }catch(error){
        res.status(400).json({
            exitoso:false,
            mensaje:'Error al actualizar el proyecto',
            error:error.message
        })
    }
};
//DELETE --- eliminar un proyecto por id
exports.deleteProject=async(req,res)=>{
    try{
        const{id}=req.params;
        const deleteProject=await project.findByIdAndDelete(id);
        if(!deleteProject){
            return res.status(404).json({
                exitoso:false,
                mensaje:'projecto no encontrado'

            })
        }
        res. status(200).json({
            exitoso:true,
            mensaje:'proyecto eliminado exitosamente'
            })
    } catch(error){
        res.status(500).json({
            exitoso:false,
            mensaje:'Error al eliminar el proyecto',
            error:error.message
         });
        }
    
    };


