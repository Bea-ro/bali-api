const Noticia = require('../models/noticia.model')
const Parser = require('rss-parser')
const parser = new Parser()

const getAllNoticias = async (req, res, next) => {
  try {
    const noticias = await Noticia.find()
    return res.status(200).json(noticias)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'No se puede acceder a las noticias en este momento.' })
  }
}

const getNoticiasPaginated = async (req, res, next) => {
  try {
    const filter = req.query.filter || ''
    const page = parseInt(req.query.page) || 0
    const pageSize = parseInt(req.query.pageSize) || 2

    const noticias = await Noticia.find({
      title: { $regex: filter, $options: 'i' }
    })
      .sort({ createdAt: -1 })
      .skip(page * pageSize)
      .limit(pageSize)

    const total = await Noticia.countDocuments({
      title: { $regex: filter, $options: 'i' }
    })

    return res.status(200).json({
      data: noticias,
      total
    })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'No se puede acceder a las noticias en este momento.' })
  }
}

const createNoticia = async (req, res, next) => {
  try {
    const newNoticia = new Noticia(req.body)
    const createdNoticia = await newNoticia.save()
    return res.status(200).send(createdNoticia)
  } catch (error) {
    return res.status(500).json({
      message:
        'Se ha producido un error al publicar la noticia. Inténtalo más tarde.'
    })
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
    const updatedData = req.body

    const updatedNoticia = await Noticia.findByIdAndUpdate(id, updatedData, {
      new: true
    })

    return res.status(200).json(updatedNoticia)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'No se ha podido actualizar la noticia. Inténtalo más tarde.'
    })
  }
}

const deleteNoticia = async (req, res, next) => {
  try {
    const deletedNoticia = await Noticia.findByIdAndDelete(req.params.id)
    return res.status(200).json('Noticia eliminada')
  } catch (error) {
    return res.status(500).json({
      message: 'No se ha podido eliminar la noticia. Inténtalo más tarde.'
    })
  }
}

const getAeatRss = async (req, res) => {
  try {
    const feed = await parser.parseURL(
      'https://sede.agenciatributaria.gob.es/Sede/todas-noticias.xml'
    )
    const cleanUrl = (url) => (typeof url === 'string' ? url.trim() : url)
    res.json(
      feed.items.map((item) => ({
        title: item.title,
        link: cleanUrl(item.link),
        pubDate: item.pubDate
      }))
    )
  } catch (error) {
    res.status(500).json({ error: 'Error leyendo el RSS' })
  }
}

const getSsRss = async (req, res) => {
  try {
    const feed = await parser.parseURL(
      'https://www.seg-social.es/wps/wcm/connect/wss/poin_contenidos/internet/1139/?srv=cmpnt&source=library&cmpntid=601fa53b-f1d2-4180-a5e7-fe0b130e0296&WCM_Page.ResetAll=TRUE&CACHE=NONE&CONTENTCACHE=NONE&CONNECTORCACHE=NONE'
    )
    const cleanUrl = (url) => (typeof url === 'string' ? url.trim() : url)
    res.json(
      feed.items.map((item) => ({
        title: item.title,
        link: cleanUrl(item.link),
        pubDate: item.pubDate
      }))
    )
  } catch (error) {
    res.status(500).json({ error: 'Error leyendo el RSS' })
  }
}

module.exports = {
  getAllNoticias,
  getNoticiasPaginated,
  getAeatRss,
  getSsRss,
  createNoticia,
  getNoticiaBySlug,
  getNoticiaById,
  updateNoticia,
  deleteNoticia
}
