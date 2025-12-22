const express = require('express')

const noticiasRouter = require('./noticia.routes')
const categoriesRouter = require('./category.routes')
const clientesRouter = require('./cliente.routes')
const adminRouter = require('./admin.routes')

const router = express.Router()

router.use('/noticias', noticiasRouter)
router.use('/categories', categoriesRouter)
router.use('/clientes', clientesRouter)
router.use('/admins', adminRouter)

module.exports = router
