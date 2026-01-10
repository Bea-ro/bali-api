const express = require('express')
const router = express.Router()

const {
  verifyTokenValidity,
  activateAccount,
  resendActivationEmail,
  sendResetEmail,
  resetPassword
} = require('../controllers/auth.controllers')

router.post('/verificar-token', verifyTokenValidity)
router.patch('/activar-cuenta', activateAccount)
router.post('/reenviar-email', resendActivationEmail)
router.post('/reset-email', sendResetEmail)
//router.patch('/resetear-contraseña', resetPassword)

module.exports = router
