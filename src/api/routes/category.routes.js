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
const { isAuth } = require('../../middlewares/auth')

router.get('/', getCategories)
router.get('/used', getCategoriesUsed)
router.get('/:id', getCategoryById)
router.post('/', [isAuth], createCategory)
router.put('/:id', [isAuth], updateCategory)
router.patch('/:id', [isAuth], updateCategory)
router.delete('/:id', [isAuth], deleteCategory)

module.exports = router
