const { verifyToken } = require('../services/jwt.service')
const Admin = require('../models/admin.model')

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
  console.log(req.body)
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
    console.log(payload)
    if (payload.purpose !== 'activation') {
      return res.status(401).json({ error: 'Token inválido' })
    }
    const user = await Admin.findById(payload.id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    user.password = password
    user.active = true
    await user.save()
    return res.json({ message: 'Cuenta activada' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Error al activar la cuenta.'
    })
  }
}

const resetPassword = async (req, res) => {}

module.exports = {
  verifyTokenValidity,
  activateAccount,
  resetPassword
}
