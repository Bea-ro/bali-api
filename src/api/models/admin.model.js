const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
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
      trim: true,
      validate: {
        validator: function (value) {
          return /^(?=.*?[a-z])(?=.*?[A-Z]).{6,}$/.test(value)
        },
        message:
          'La contraseña debe tener al menos 6 caracteres y contener mayúsculas y minúsculas.'
      }
    },
    rol: {
      type: String,
      enum: ['superadmin', 'editor'],
      required: true
    },
    active: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    collection: 'admins'
  }
)

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin
