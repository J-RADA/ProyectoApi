const express= require('express');
const router= express.Router();
const{
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerControllers');
const { proteger } = require('../middleware/authMiddleware');
const { autorizar } = require('../middleware/roleMiddleware');
// GET --- obtener todos los clientes
router.get('/', proteger, autorizar('admin'), getAllCustomers);
// GET by id --- obtener un cliente por id
router.get('/:id', proteger, autorizar('admin'), getCustomerById);
// POST --- crear un nuevo cliente
router.post('/', proteger, autorizar('admin'), createCustomer);
// PUT --- actualizar un cliente existente
router.put('/:id', proteger, autorizar('admin'), updateCustomer);
// DELETE --- eliminar un cliente por id
router.delete('/:id', proteger, autorizar('admin'), deleteCustomer);
module.exports=router;