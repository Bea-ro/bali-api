const express = require('express')
const {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  getAllDocuments,
  getDocument
} = require('../controllers/cliente.controllers')
const router = express.Router()

router.get('/', getAllClientes)
//router.get('/:id', getClienteById)
router.post('/', createCliente)
router.put('/:id', updateCliente)
router.patch('/:id', updateCliente)
router.delete('/:id', deleteCliente)
// router.get('/:cliente', getAllDocuments)
// router.get('/:cliente/:archivo', getDocument)

module.exports = router
