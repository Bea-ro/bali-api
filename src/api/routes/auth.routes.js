const express = require('express')
const router = express.Router()

const {
  verifyTokenValidity,
  activateAccount,
  resetPassword
} = require('../controllers/auth.controllers')

router.post('/verificar-token', verifyTokenValidity)
router.patch('/activar-cuenta', activateAccount)
router.patch('/resetear-contraseña', resetPassword)

module.exports = router
