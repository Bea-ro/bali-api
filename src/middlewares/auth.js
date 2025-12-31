const Admin = require('../api/models/admin.model')
const Cliente = require('../api/models/cliente.model')
const { verifyToken } = require('../api/services/jwt.service')

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log('headers:', req.headers)
  if (!authHeader) {
    return res.status(401).json({ message: 'No hay token' })
  }
  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token inválido' })
  }
  try {
    const payload = verifyToken(token)
    const userLogged =
      payload.rol === 'cliente'
        ? await Cliente.findById(payload.id)
        : await Admin.findById(payload.id)
    userLogged.password = null
    req.user = userLogged
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
