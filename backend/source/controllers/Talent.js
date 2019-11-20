const axios = require('axios')
const Talent = require('../models/Talent.js')

module.exports = {
  async index (request, response) {
    const { user } = request.headers

    const loggedTalent = await Talent.findById(user)

    const users = await Talent.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedTalent.likes } },
        { _id: { $nin: loggedTalent.dislikes } }
      ]
    }).sort({ _id: -1 })

    return response.json(users)
  },

  async store (request, response) {
    const { name, email, password, location } = request.body

    const userExists = await Talent.findOne({ email })

    if (userExists) {
      console.log(`User with email ${email} already exists.`)
      return response.json(userExists)
    }

    const talent = await Talent.create({
      name,
      email,
      location,
      password
    })

    console.log(`User ${email} created.`)
    return response.json(talent)
  }
}
