const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/:cliente', (req, res) => {
  const cliente = req.params.cliente
  const basePath = `C:/Users/b_a_r/Documents/TWS/Clientes/${cliente}`

  fs.readdir(basePath, (err, files) => {
    if (err)
      return res.status(500).json({ error: 'No se pudieron leer los archivos' })

    const documentos = files.map((file) => ({
      name: file,
      path: `/clientes/${cliente}/archivo/${file}` // ruta para descargar
    }))

    res.json(documentos)
  })
})

router.get('/:cliente/archivo/:name', (req, res) => {
  const cliente = req.params.cliente
  const name = req.params.name // aquí sí decodificas
  const filePath = path.join(
    `C:/Users/b_a_r/Documents/TWS/Clientes/${cliente}`,
    name
  )
  console.log(filePath)
  res.sendFile(filePath)
})

module.exports = router
