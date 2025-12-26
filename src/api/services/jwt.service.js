const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

const signActivationToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      rol: user.rol,
      purpose: 'activation'
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
}

const signLoginToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      rol: user.rol
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 }
  )
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}

module.exports = {
  signActivationToken,
  signLoginToken,
  verifyToken,
  hashPassword
}
