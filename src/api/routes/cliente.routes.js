const express = require('express')
const {
  getClientes,
  clienteLogin,
  clienteRegister,
  // updateCliente,
  clienteDeregister,
  getAllDocuments,
  getDocument
} = require('../controllers/cliente.controllers')
const {
  activateAccount,
  resetPassword
} = require('../controllers/auth.controllers')
const router = express.Router()

router.get('/', getClientes)
router.post('/registro', clienteRegister)
router.post('/login', clienteLogin)
// router.put('/:id', updateCliente)
// router.patch('/:id', updateCliente)
router.delete('/:id', clienteDeregister)
// router.get('/:cliente', getAllDocuments)
// router.get('/:cliente/:archivo', getDocument)

router.post('/activar-cuenta', activateAccount)
router.post('/resetear-contraseña', resetPassword)

module.exports = router
