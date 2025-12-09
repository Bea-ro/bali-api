const express = require('express')
const {
  getAllNoticias,
  getNoticiaBySlug,
  getNoticiaById,
  createNoticia,
  updateNoticia,
  deleteNoticia
} = require('../controllers/noticia.controllers')
const router = express.Router()

router.get('/', getAllNoticias)
router.get('/slug/:slug', getNoticiaBySlug)
router.get('/id/:id', getNoticiaById)
router.post('/', createNoticia)
router.put('/:slug', updateNoticia)
router.patch('/:slug', updateNoticia)
router.delete('/:slug', deleteNoticia)

module.exports = router
