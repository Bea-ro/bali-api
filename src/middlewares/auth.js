const Admin = require('../api/models/admin.model')
const { verifyToken } = require('../api/services/jwt.service')

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ message: 'No hay token' })
    }

    const parsedToken = token?.replace('Bearer ', '')
    const validToken = verifyToken(parsedToken)
    const adminLogued = await Admin.findById(validToken.email)

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
