const { Schema, model } = require('mongoose')

const EmployerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Employer', EmployerSchema)
