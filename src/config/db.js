const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI)
      console.log('Conectado a DB')
    } else {
      console.log('Conexión a DB ya existente')
    }
  } catch (error) {
    console.log('Error conectando a DB', error)
  }
}

module.exports = { connectDB }
