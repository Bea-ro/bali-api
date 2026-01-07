const express = require('express')
const router = express.Router()

const {
  getClientes,
  getClientesPaginated,
  clienteLogin,
  clienteRegister,
  // updateCliente,
  clienteDeregister,
  getAllDocuments,
  getDocument
} = require('../controllers/cliente.controllers')

const { isAuth } = require('../../middlewares/auth')

router.get('/todos', [isAuth], getClientes)
router.get('/', [isAuth], getClientesPaginated)
router.post('/registro', [isAuth], clienteRegister)
router.post('/login', clienteLogin)
// router.put('/:id', updateCliente)
// router.patch('/:id', updateCliente)
router.delete('/:id', [isAuth], clienteDeregister)
router.get('/:id/archivo/*splat', [isAuth], getDocument)
router.get('/:id', [isAuth], getAllDocuments)

module.exports = router
