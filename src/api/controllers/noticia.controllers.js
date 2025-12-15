const Noticia = require('../models/noticia.model')

const getAllNoticias = async (req, res, next) => {
  try {
    const noticias = await Noticia.find()
    return res.status(200).json(noticias)
  } catch (error) {
    return next('Noticias no encontradas', error)
  }
}

const createNoticia = async (req, res, next) => {
  try {
    const newNoticia = new Noticia(req.body)
    const createdNoticia = await newNoticia.save()
    return res.status(200).send(createdNoticia)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al guardar la noticia', error })
  }
}

const getNoticiaBySlug = async (req, res, next) => {
  try {
    const noticia = await Noticia.findOne({ slug: req.params.slug })

    if (!noticia) {
      return res.status(404).json({ message: 'Noticia no encontrada' })
    }
    return res.status(200).json(noticia)
  } catch (error) {
    return next(error)
  }
}

const getNoticiaById = async (req, res, next) => {
  try {
    const noticia = await Noticia.findById(req.params.id)

    if (!noticia) {
      return res.status(404).json({ message: 'Noticia no encontrada' })
    }
    return res.status(200).json(noticia)
  } catch (error) {
    return next(error)
  }
}

const updateNoticia = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedNoticia = await Noticia.findByIdAndUpdate(id, updateData, {
      new: true
    })
    console.log(updatedNoticia)
    return res.status(200).json(updatedNoticia)
  } catch (error) {
    console.log(error)
    return next('Noticia no actualizada', error)
  }
}

const deleteNoticia = async (req, res, next) => {
  try {
    const deletedNoticia = await Noticia.findByIdAndDelete(req.params.id)
    return res.status(200).json('Noticia eliminada')
  } catch (error) {
    return next('Noticia no encontrada', error)
  }
}

module.exports = {
  getAllNoticias,
  createNoticia,
  getNoticiaBySlug,
  getNoticiaById,
  updateNoticia,
  deleteNoticia
}
