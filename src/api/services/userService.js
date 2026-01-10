const Cliente = require('../models/cliente.model')
const Admin = require('../models/admin.model')
const { signActivationToken } = require('./jwt.service')
const { sendActivationEmail, sendResetEmail } = require('./mail.service')

const UserService = {
  async findByEmail(email) {
    return (
      (await Cliente.findOne({ email: email })) ||
      (await Admin.findOne({ email: email }))
    )
  },
  async isActive(user) {
    return user.active
  },
  async generateActivation(user) {
    const token = signActivationToken(user)
    await sendActivationEmail(user.email, token)
  },
  async generateReset(user) {
    const token = signActivationToken(user)
    await sendResetEmail(user.email, token)
  }
}

module.exports = {
  UserService
}
