const Employer = require('../models/Employer.js')

module.exports = {
  async index (request, response) {
    const { user } = request.headers

    const loggedEmployer = await Employer.findById(user)

    const users = await Employer.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedEmployer.likes } },
        { _id: { $nin: loggedEmployer.dislikes } }
      ]
    }).sort({ _id: -1 })

    return response.json(users)
  },

  async store (request, response) {
    const { name, email, password, location } = request.body

    const userExists = await Employer.findOne({ email })

    if (userExists) {
      console.log(`User with email ${email} already exists.`)
      return response.json(userExists)
    }

    const employer = await Employer.create({
      name,
      email,
      location,
      password
    })

    console.log(`Employer ${email} created.`)
    return response.json(employer);
  }
}
