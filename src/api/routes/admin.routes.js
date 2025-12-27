const express = require('express')
const router = express.Router()

const {
  getAdmins,
  adminRegister,
  adminLogin,
  adminDeregister
} = require('../controllers/admin.controllers')

const { isAuth } = require('../../middlewares/auth')

router.get('/', [isAuth], getAdmins)
router.post('/registro', [isAuth], adminRegister)
router.post('/login', adminLogin)
router.delete('/:id', [isAuth], adminDeregister)

module.exports = router
