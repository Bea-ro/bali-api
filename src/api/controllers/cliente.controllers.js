const Cliente = require('../models/cliente.model')
const fs = require('fs')
const path = require('path')
const {
  signActivationToken,
  signLoginToken
} = require('../services/jwt.service')
const { sendActivationEmail } = require('../services/mail.service')
const bcrypt = require('bcrypt')

const getClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find()
    return res.status(200).json(clientes)
  } catch (error) {
    return next('No es posible acceder a los clientes', error)
  }
}

const clienteRegister = async (req, res, next) => {
  console.log(req.body)
  try {
    const newCliente = await Cliente.create({
      name: req.body.name,
      email: req.body.email,
      cif: req.body.cif,
      active: false
    })
    console.log(newCliente)
    const token = signActivationToken(newCliente)
    const emailSent = await sendActivationEmail(newCliente.email, token)
    if (!emailSent) {
      return res.status(500).json({
        message:
          'No se pudo enviar el email de activación. Inténtalo más tarde.'
      })
    }
    return res.status(200).json(newCliente)
  } catch (error) {
    console.log(error)
    if (error.code === 11000 && error.keyValue?.email) {
      return res
        .status(409)
        .json({ message: 'Ya existe un cliente con este correo.', error })
    }
    if (error.code === 11000 && error.keyValue?.name) {
      return res
        .status(409)
        .json({ message: 'Ya existe un administrador con este nombre.', error })
    }
    if (error.code === 11000 && error.keyValue?.cif) {
      return res.status(409).json({
        message: 'Ya existe un administrador con documento fiscal.',
        error
      })
    }
    return res.status(500).json({
      message:
        'Se ha producido un error al registrar el cliente. Inténtalo más tarde.',
      error
    })
  }
}

const clienteLogin = async (req, res, next) => {
  try {
    const clienteDB = await Cliente.findOne({ email: req.body.email })
    if (!clienteDB) {
      return res
        .status(404)
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
        email: clienteDB.email
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
  getClientes,
  clienteRegister,
  clienteLogin,
  // updateCliente,
  clienteDeregister,
  getAllDocuments,
  getDocument
}
