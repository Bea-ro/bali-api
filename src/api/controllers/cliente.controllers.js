const Cliente = require('../models/cliente.model')
const fs = require('fs')
const path = require('path')
const {
  signActivationToken,
  signLoginToken
} = require('../services/jwt.service')
const { sendActivationEmail } = require('../services/mail.service')
const bcrypt = require('bcrypt')

const BASE_PATH = 'C:/Users/b_a_r/Documents/TWS/Clientes'

const getClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find()
    return res.status(200).json(clientes)
  } catch (error) {
    return res.status(500).json({
      message: 'No se ha podido acceder a los clientes.'
    })
  }
}

const getClientesPaginated = async (req, res, next) => {
  try {
    const filter = req.query.filter || ''
    const page = parseInt(req.query.page) || 0
    const pageSize = parseInt(req.query.pageSize) || 2

    const clientes = await Cliente.find({
      name: { $regex: filter, $options: 'i' }
    })
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await Cliente.countDocuments({
      name: { $regex: filter, $options: 'i' }
    })

    return res.status(200).json({
      data: clientes,
      total
    })
  } catch (error) {
    return res.status(500).json({
      message: 'No se ha podido acceder a los clientes.'
    })
  }
}

const clienteRegister = async (req, res, next) => {
  try {
    const newCliente = await Cliente.create({
      name: req.body.name,
      email: req.body.email,
      cif: req.body.cif,
      active: false
    })
    const token = signActivationToken(newCliente)
    const emailSent = await sendActivationEmail(newCliente.email, token)
    if (!emailSent) {
      return res.status(500).json({
        message:
          'No se ha podido enviar el email de activación. Inténtalo más tarde.'
      })
    }
    return res.status(200).json(newCliente)
  } catch (error) {
    console.log(error)
    if (error.code === 11000 && error.keyValue?.email) {
      return res
        .status(409)
        .json({ message: 'Ya existe un cliente con este correo.' })
    }
    if (error.code === 11000 && error.keyValue?.name) {
      return res
        .status(409)
        .json({ message: 'Ya existe un cliente con este nombre.' })
    }
    if (error.code === 11000 && error.keyValue?.cif) {
      return res.status(409).json({
        message: 'Ya existe un cliente con este documento fiscal.'
      })
    }
    return res.status(500).json({
      message:
        'Se ha producido un error al registrar el cliente. Inténtalo más tarde.'
    })
  }
}

const clienteLogin = async (req, res, next) => {
  try {
    const clienteDB = await Cliente.findOne({ email: req.body.email })
    if (!clienteDB) {
      return res
        .status(401)
        .json({ message: 'Email o contraseña incorrectos.' })
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      clienteDB.password
    )

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Email o contraseña incorrectos.'
      })
    }

    if (!clienteDB.active) {
      return res.status(403).json({
        message: 'La cuenta está inactiva. Contacta con el administrador.'
      })
    }

    const token = signLoginToken(clienteDB)
    return res.status(200).json({
      token,
      user: {
        id: clienteDB._id,
        email: clienteDB.email,
        rol: clienteDB.rol
      }
    })
  } catch (error) {
    console.error('LOGIN ERROR:', error)
    return res.status(500).json({
      message: 'Error interno del servidor. Inténtalo más tarde.'
    })
  }
}

// const updateCliente = async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const updateData = req.body

//     const updatedCliente = await Cliente.findByIdAndUpdate(id, updateData, {
//       new: true
//     })

//     return res.status(200).json(updatedCliente)
//   } catch (error) {
//     console.log(error)
//     return next('Error al actualizar el cliente', error)
//   }
// }

const clienteDeregister = async (req, res, next) => {
  try {
    const cliente = await Cliente.findById(req.params.id)

    if (!cliente) {
      return res.status(404).json('Cliente no encontrado')
    }

    await Cliente.findByIdAndDelete(req.params.id)
    return res.status(200).json('Se ha dado de baja al cliente.')
  } catch (error) {
    return res.status(500).json({
      message:
        'Se ha producido un error al borrar el cliente. Por favor, inténtalo más tarde.'
    })
  }
}

const getAllDocuments = async (req, res, next) => {
  try {
    const clienteDB = await Cliente.findById(req.params.id)
    if (!clienteDB)
      return res.status(404).json({ message: 'Cliente no encontrado' })

    const clienteDir = path.join(BASE_PATH, clienteDB.name)

    if (!fs.existsSync(clienteDir)) {
      return res.status(404).json({ message: 'Ruta no encontrada' })
    }

    const folders = fs
      .readdirSync(clienteDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())

    const result = folders.map((folder) => {
      const folderPath = path.join(clienteDir, folder.name)
      const files = fs
        .readdirSync(folderPath, { withFileTypes: true })
        .filter((e) => e.isFile())
        .map((file) => ({
          name: file.name,
          path: path.posix.join(folder.name, file.name)
        }))

      return {
        name: folder.name,
        files
      }
    })
    res.json(result)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error al acceder a los documentos.' })
  }
}

const getDocument = async (req, res) => {
  try {
    const clienteDB = await Cliente.findById(req.params.id)
    if (!clienteDB)
      return res.status(404).json({ message: 'Cliente no encontrado' })
    const relativePath = req.params.splat
    const filePath = path.join(BASE_PATH, clienteDB.name, ...relativePath)
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Archivo no encontrado' })
    }
    res.sendFile(filePath)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error al acceder al documento.' })
  }
}

module.exports = {
  getClientes,
  getClientesPaginated,
  clienteRegister,
  clienteLogin,
  // updateCliente,
  clienteDeregister,
  getAllDocuments,
  getDocument
}
