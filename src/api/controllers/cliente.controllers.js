const Cliente = require('../models/cliente.model')
const fs = require('fs')
const path = require('path')

const getAllClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find()
    return res.status(200).json(clientes)
  } catch (error) {
    return next('No es posible acceder a los clientes', error)
  }
}

const createCliente = async (req, res, next) => {
  try {
    const newCliente = new Cliente(req.body)
    const createdCliente = await newCliente.save()
    return res.status(200).json(createdCliente)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al guardar el cliente', error })
  }
}

const getClienteById = async (req, res, next) => {
  try {
    const cliente = await Cliente.findById(req.params.id)

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }
    return res.status(200).json(cliente)
  } catch (error) {
    return next(error)
  }
}

const updateCliente = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedCliente = await Cliente.findByIdAndUpdate(id, updateData, {
      new: true
    })
    console.log(updatedCliente)
    return res.status(200).json(updatedCliente)
  } catch (error) {
    console.log(error)
    return next('Error al actualizar el cliente', error)
  }
}

const deleteCliente = async (req, res, next) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id)
    return res.status(200).json('Cliente borrado')
  } catch (error) {
    return next('Cliente no encontrado', error)
  }
}

const getAllDocuments = async (req, res, next) => {
  try {
    const cliente = req.params.cliente
    const basePath = `C:/Users/b_a_r/Documents/TWS/Clientes/${cliente}`

    fs.readdir(basePath, (err, files) => {
      if (err)
        return res
          .status(500)
          .json({ error: 'Error al acceder a los archivos' })

      const documentos = files.map((file) => ({
        name: file,
        path: `/clientes/${cliente}/${file}`
      }))

      res.json(documentos)
    })
  } catch (error) {
    return next('Error al acceder a los documentos', error)
  }
}

const getDocument = async (req, res, next) => {
  try {
    const cliente = req.params.cliente
    //ojo aquí ponía name en vez de arhcivo y la ruta del router llevaba /archivo/ delante del /:name
    const archivo = req.params.archivo
    const filePath = path.join(
      `C:/Users/b_a_r/Documents/TWS/Clientes/${cliente}`,
      archivo
    )
    res.sendFile(filePath)
  } catch (error) {
    return next('Error al acceder al documento', error)
  }
}

module.exports = {
  getAllClientes,
  createCliente,
  getClienteById,
  updateCliente,
  deleteCliente,
  getAllDocuments,
  getDocument
}
