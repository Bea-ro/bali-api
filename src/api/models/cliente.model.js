const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const ClienteSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true.valueOf,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: 'Email inválido. Por favor, revísalo y vuelve a intentarlo.'
      }
    },
    password: {
      type: String,
      required: false,
      trim: true
    },
    cif: { type: String, unique: true, required: true, trim: true },
    active: { type: Boolean, default: false },
    rol: {
      type: String,
      default: 'cliente',
      immutable: true
    }
  },
  {
    timestamps: true,
    collection: 'clientes'
  }
)

ClienteSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports = Cliente
