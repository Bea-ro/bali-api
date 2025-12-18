const mongoose = require('mongoose')

const ClienteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    cif: { type: String, required: true, trim: true }
  },
  {
    timestamps: true,
    collection: 'clientes'
  }
)

const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports = Cliente
