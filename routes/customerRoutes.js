const express= require('express');
const router= express.Router();
const{
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerControllers');
// GET --- obtener todos los clientes
router.get('/',getAllCustomers);
// GET by id --- obtener un cliente por id
router.get('/:id',getCustomerById);
// POST --- crear un nuevo cliente
router.post('/',createCustomer); 
// PUT --- actualizar un cliente existente
router.put('/:id',updateCustomer);
// DELETE --- eliminar un cliente por id
router.delete('/:id',deleteCustomer);   
module.exports=router;