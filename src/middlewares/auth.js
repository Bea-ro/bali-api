const Admin = require('../api/models/admin.model')
const { verifyToken } = require('../api/services/jwt.service')

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ message: 'No hay token' })
  }
  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token inválido' })
  }
  try {
    const validToken = verifyToken(token)
    const adminLogued = await Admin.findById(validToken.id)
    adminLogued.password = null
    req.user = adminLogued
    next()
  } catch (error) {
    return res
      .status(401)
      .json(
        'Se ha producido un error al iniciar sesión. Por favor, inténtalo más tarde.'
      )
  }
}

module.exports = { isAuth }
