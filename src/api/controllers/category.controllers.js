const Category = require('../models/category.model')

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate('noticias')
    return res.status(200).json(categories)
  } catch (error) {
    return next('No se ha podido acceder a las categorías', error)
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
    const category = await Category.findOne({ id: req.params.id }).populate(
      'noticias'
    )

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
    const { id } = req.params
    const { updateData } = req.body

    const updatedCategory = await Category.findOneAndUpdate(id, updateData, {
      new: true
    }).populate('noticias')

    return res.status(200).json(updatedCategory)
  } catch (error) {
    console.log(error)
    return next('Categoría no actualizada', error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      id: req.params.id
    })
    return res.status(200).json('Categoría eliminada')
  } catch (error) {
    return next('Categoría no encontrada', error)
  }
}

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
}
