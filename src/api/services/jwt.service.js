const jwt = require('jsonwebtoken')

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

module.exports = {
  signActivationToken,
  signLoginToken,
  verifyToken
}
