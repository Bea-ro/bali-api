const express = require('express')
const cors = require('cors')
const { connectDB } = require('./src/config/db')
const mainRouter = require('./src/api/routes/index.routes')

const app = express()
const PORT = Number(process.env.PORT) || 3001

const corsOptions = {
  origin: [
    process.env.ORIGIN_URL,
    'http://localhost:4200',
    process.env.AEAT_URL,
    process.env.SS_URL
  ],
  //origin: process.env.ORIGIN_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Permitir cookies
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE, PATCH')
  res.header('Access-Control-Allow-Headers', 'Content-type')
  next()
})
app.disable('x-powered-by')
app.use('/api', mainRouter)
app.use((req, res, next) => {
  // res.status(404).json({data: 'Not found'})
  return res.status(404).json('Ruta no encontrada')
})

app.use((error, req, res, next) => {
  console.error('Error en el servidor:', error)
  return res.status(500).json('Error del servidor')
})

connectDB()

app.listen(PORT, () => {
  console.log(
    `La aplicación está corriendo en el puerto http:localhost:${PORT}`
  )
})
