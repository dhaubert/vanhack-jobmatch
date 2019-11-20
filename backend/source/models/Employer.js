const { Schema, model } = require('mongoose')
// 5dd4096007f91b339063a5f3
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
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Employer', EmployerSchema)
