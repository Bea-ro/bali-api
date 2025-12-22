const bcrypt = require('bcrypt')
const Admin = require('../models/admin.model')
const { signToken } = require('../../config/jwt')

const getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find()
    return res.status(200).json(admins)
  } catch (error) {
    return next('No se ha podido acceder a los administradores', error)
  }
}

const adminRegister = async (req, res, next) => {
  console.log(req.body)
  try {
    const newAdmin = new Admin(req.body)
    console.log(newAdmin)
    const registeredAdmin = await newAdmin.save()
    console.log(registeredAdmin)
    return res.status(200).json(registeredAdmin)
  } catch (error) {
    console.error('registro ERROR:', error)
    return res
      .status(500)
      .json({ message: 'Error al registrar al administrador', error })
  }
}

const adminLogin = async (req, res, next) => {
  try {
    const adminDB = await Admin.findOne({ email: req.body.email })
    if (!adminDB) {
      return res.status(401).json({
        message: 'Email o contraseña incorrectos.'
      })
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      adminDB.password
    )
    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Email o contraseña incorrectos'
      })
    }

    const token = signToken(adminDB)
    return res.status(200).json({
      token,
      admin: {
        id: adminDB._id,
        email: adminDB.email,
        rol: adminDB.rol
      }
    })
  } catch (error) {
    console.error('LOGIN ERROR:', error)
    return res.status(500).json({
      message: 'Error interno del servidor.',
      error: error.message
    })
  }
}

const adminDeregister = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id)

    if (!admin) {
      return res.status(404).json('Administrador no encontrado')
    }

    await Admin.findByIdAndDelete(req.params.id)
    return res.status(200).json('Se ha dado de baja al administrador.')
  } catch (error) {
    return next('Administrador no encontrado', error)
  }
}

module.exports = {
  getAdmins,
  adminRegister,
  adminLogin,
  adminDeregister
}
