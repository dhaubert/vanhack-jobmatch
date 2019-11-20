const { Schema, model } = require('mongoose')
//5dd408245cb01c2eaf2ed35a
const TalentSchema = new Schema(
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
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Job'
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Job'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = model('Talent', TalentSchema)
