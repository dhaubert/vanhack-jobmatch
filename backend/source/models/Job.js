const { Schema, model } = require("mongoose");

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
    techs: [
      {
        type: String,
        required: true
      }
    ],
    tags: [
      {
        type: String,
        required: true
      }
    ],
    experience: {
      type: String,
    },
    location: {
      type: String,
      required: true
    },
    salary: { type: String },
    employer: {
      type: Schema.Types.ObjectId,
      ref: "Employer",
      required: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Talent"
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Talent"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("Job", JobSchema);
