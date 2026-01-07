const { verifyToken, signLoginToken } = require('../services/jwt.service')
const Admin = require('../models/admin.model')
const Cliente = require('../models/cliente.model')
const { UserService } = require('../services/userService')

const verifyTokenValidity = async (req, res) => {
  try {
    const { token } = req.body
    if (!token) {
      return res.status(400).json({ valid: false, message: 'Token requerido.' })
    }
    const payload = verifyToken(token)
    if (payload.purpose !== 'activation') {
      return res.status(403).json({ valid: false, message: 'Token inválido.' })
    }
    return res.status(200).json({ valid: true })
  } catch {
    return res.status(401).json({
      valid: false,
      message: 'Token inválido o expirado.'
    })
  }
}

const activateAccount = async (req, res, next) => {
  try {
    const { token, password } = req.body
    if (!token) {
      return res.status(400).json({ message: 'Token requerido' })
    }
    const PASSWORD_REGEX = /^(?=.*?[a-z])(?=.*?[A-Z]).{6,}$/
    if (!PASSWORD_REGEX.test(password)) {
      throw new Error('Password débil')
    }
    const payload = verifyToken(token)

    if (payload.purpose !== 'activation') {
      return res.status(401).json({ error: 'Token inválido' })
    }

    const user =
      payload.rol === 'cliente'
        ? await Cliente.findById(payload.id)
        : await Admin.findById(payload.id)

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    user.password = password
    user.active = true
    await user.save()
    const loginToken = signLoginToken(user)

    return res.json({
      message: 'Cuenta activada',
      token: loginToken,
      user: {
        id: user._id,
        rol: user.rol
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Error al activar la cuenta.'
    })
  }
}
const resendActivationEmail = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await UserService.findByEmail(email)
    if (!user) {
      return res.status(200).json({
        message: 'Si el correo existe, se ha reenviado el email de activación.'
      })
    }
    if (user.active) {
      return res.status(400).json({ message: 'La cuenta ya está activada.' })
    }
    const emailSent = await UserService.generateActivation(user)
    if (!emailSent) {
      return res.status(500).json({
        message:
          'No se ha podido enviar el email de activación. Inténtalo más tarde.'
      })
    }
    return res.status(200).json({
      message: 'Email de activación reenviado.'
    })
  } catch (error) {
    console.error('LOGIN ERROR:', error)
    return res.status(500).json({
      message:
        'Se ha producido un error al reenviar el email. Inténtalo más tarde.'
    })
  }
}

const resetPassword = async (req, res) => {}

module.exports = {
  verifyTokenValidity,
  activateAccount,
  resendActivationEmail,
  resetPassword
}
