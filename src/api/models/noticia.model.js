const mongoose = require('mongoose')

const NoticiaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true }
  },
  {
    timestamps: true,
    collection: 'noticias'
  }
)

const Noticia = mongoose.model('Noticia', NoticiaSchema)

module.exports = Noticia
