const express= require('express');
const router= express.Router();
const projectController= require('../controllers/projectControllers');

//Get all projects- obtener todos los proyectos
router.get('/',projectController.getAllProjects);
//Get by category- obtener un proyecto por categoria
router.get('/:typeOfProject',projectController.getProjectById);
//Post- agregar un nuevo proyecto
router.post('/',projectController.createNewProject);
//Put- actualizar un proyecto existente
router.put('/:id',projectController.updateProject);    
//Delete- eliminar un proyecto por id
router.delete('/:id',projectController.deleteProject);
module.exports=router;