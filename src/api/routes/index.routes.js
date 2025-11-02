const express = require('express')

const noticiasRouter = require('./noticia.routes')
//const userRouter = require('./user.routes')

const router = express.Router()

router.use('/noticias', noticiasRouter)
//router.use('/users', userRouter)

module.exports = router
