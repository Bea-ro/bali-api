const express = require('express')

const noticiasRouter = require('./noticia.routes')
const categoriesRouter = require('./category.routes')
const clientesRouter = require('./cliente.routes')
//const userRouter = require('./user.routes')

const router = express.Router()

router.use('/noticias', noticiasRouter)
router.use('/categories', categoriesRouter)
router.use('/clientes', clientesRouter)
//router.use('/users', userRouter)

module.exports = router
