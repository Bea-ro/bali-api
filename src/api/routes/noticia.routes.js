const express = require('express')
const {
  getAllNoticias,
  getNoticiaBySlug,
  createNoticia,
  updateNoticia,
  deleteNoticia
} = require('../controllers/noticia.controllers')
const router = express.Router()

router.get('/', getAllNoticias)
router.get('/:slug', getNoticiaBySlug)
router.post('/', createNoticia)
router.put('/:slug', updateNoticia)
router.patch('/:slug', updateNoticia)
router.delete('/:slug', deleteNoticia)

module.exports = router
