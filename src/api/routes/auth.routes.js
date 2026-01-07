const express = require('express')
const router = express.Router()

const {
  verifyTokenValidity,
  activateAccount,
  resendActivationEmail,
  resetPassword
} = require('../controllers/auth.controllers')

router.post('/verificar-token', verifyTokenValidity)
router.patch('/activar-cuenta', activateAccount)
router.post('/reenviar-email', resendActivationEmail)
router.patch('/resetear-contraseña', resetPassword)

module.exports = router
