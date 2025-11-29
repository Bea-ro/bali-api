const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 35 }
  },
  {
    timestamps: true,
    collection: 'categorias'
  }
)

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
