const express = require('express')
const {
  getAllNoticias,
  getRSS,
  getNoticiaBySlug,
  getNoticiaById,
  createNoticia,
  updateNoticia,
  deleteNoticia
} = require('../controllers/noticia.controllers')
const router = express.Router()
const { isAuth } = require('../../middlewares/auth')

router.get('/', getAllNoticias)
router.get('/rss/aeat', getRSS)
router.get('/slug/:slug', getNoticiaBySlug)
router.get('/id/:id', getNoticiaById)
router.post('/', [isAuth], createNoticia)
router.put('/:id', [isAuth], updateNoticia)
router.patch('/:id', [isAuth], updateNoticia)
router.delete('/:id', [isAuth], deleteNoticia)

module.exports = router
