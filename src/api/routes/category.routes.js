const express = require('express')
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controllers')
const router = express.Router()

router.get('/', getCategories)
router.get('/:slug', getCategoryById)
router.post('/', createCategory)
router.put('/:slug', updateCategory)
router.patch('/:slug', updateCategory)
router.delete('/:slug', deleteCategory)

module.exports = router
