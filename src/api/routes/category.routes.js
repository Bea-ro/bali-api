const express = require('express')
const {
  getCategories,
  getCategoriesUsed,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controllers')
const router = express.Router()

router.get('/', getCategories)
router.get('/used', getCategoriesUsed)
router.get('/:id', getCategoryById)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.patch('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
