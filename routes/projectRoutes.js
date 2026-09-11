const express= require('express');
const router= express.Router();
const projectController= require('../controllers/projectControllers');
const { proteger } = require('../middleware/authMiddleware');
const { autorizar } = require('../middleware/roleMiddleware');

//cualquier usuario autenticado puede ver todos los proyectos
//Get all projects- obtener todos los proyectos
router.get('/',projectController.getAllProjects);
//Get by category- obtener un proyecto por categoria
router.get('/:typeOfProject',projectController.getProjectById);

//solo los usuarios con rol de admin pueden crear, editar y eliminar
//Post- agregar un nuevo proyecto
router.post('/',proteger,autorizar('admin'),projectController.createNewProject);
//Put- actualizar un proyecto existente
router.put('/:id',proteger,autorizar('admin'),projectController.updateProject);    
//Delete- eliminar un proyecto por id
router.delete('/:id',proteger,autorizar('admin'),projectController.deleteProject);
module.exports=router;