const express = require('express')
const router = express.Router()

const {
  getAdmins,
  adminRegister,
  adminLogin,
  adminDeregister
} = require('../controllers/admin.controllers')
const {
  activateAccount,
  resetPassword
} = require('../controllers/auth.controllers')

const { isAuth } = require('../../middlewares/auth')

// router.get('/', [isAuth], getAdmins)
router.get('/', getAdmins)
// router.post('/registro', [isAuth], adminRegister)
router.post('/registro', adminRegister)
router.post('/login', adminLogin)
router.delete('/:id', adminDeregister)
//router.delete('/:id', [isAuth], adminDeregister)

router.post('/activar-cuenta', activateAccount)
router.post('/resetear-contraseña', resetPassword)

module.exports = router
