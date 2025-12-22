const activateAccount = async (req, res) => {
  const { token, password } = req.body
  const payload = verifyToken(token)
  if (payload.purpose !== 'activation') {
    return res.status(401).json({ error: 'Token inválido' })
  }
  const user = await Admin.findById(payload.id)
  user.password = await hashPassword(password)
  user.active = true
  await user.save()
  res.json({ message: 'Cuenta activada' })
}

const resetPassword = async (req, res) => {}

module.exports = {
  activateAccount,
  resetPassword
}
