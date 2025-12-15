const Category = require('../models/category.model')
const Noticia = require('../models/noticia.model')

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
    return res.status(200).json(categories)
  } catch (error) {
    return next('No se ha podido acceder a las categorías', error)
  }
}

const getCategoriesUsed = async (req, res, next) => {
  try {
    const categories = await Noticia.distinct('category', {
      category: { $ne: '' }
    })
    console.log(categories)
    return res.status(200).json(categories)
  } catch (error) {
    return next('No se ha podido acceder a las categorías utilizadas', error)
  }
}

const createCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body)
    const createdCategory = await newCategory.save()
    return res.status(200).json(createdCategory)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al guardar la categoría', error })
  }
}

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }
    return res.status(200).json(category)
  } catch (error) {
    return next(error)
  }
}

const updateCategory = async (req, res, next) => {
  try {
    console.log(req.params, req.body)
    const { id } = req.params
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true
    })
    return res.status(200).json(updatedCategory)
  } catch (error) {
    console.log(error)
    return next('Categoría no actualizada', error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)

    if (!category) {
      return res.status(404).json('Categoría no encontrada')
    }

    await Noticia.updateMany(
      { category: category.category },
      { $set: { category: 'General' } }
    )

    await Category.findByIdAndDelete(req.params.id)
    return res.status(200).json('Categoría eliminada')
  } catch (error) {
    return next('Categoría no encontrada', error)
  }
}

module.exports = {
  getCategories,
  getCategoriesUsed,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
}
