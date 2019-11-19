const { Schema, model } = require('mongoose')

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isRemote: {
      type: Boolean,
      required: true
    },
    techs: {
      type: String,
      required: true
    },
    tags: {
      type: String,
      required: true
    },
    experience: {
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

module.exports = model('Job', JobSchema)
