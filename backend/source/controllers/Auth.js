const axios = require('axios')
const Talent = require('../models/Talent.js')
const Employer = require('../models/Employer.js')

module.exports = {
  async index (request, response) {
    const { email, password } = request.body

    let user = await Talent.findOne({
      $and: [
        { email: email },
        { password: password }
      ]
    });
    user = user? { ...user._doc, role: 'talent'}: null;

    console.log('User talent:', user);

    if (!user) {
        user = await Employer.findOne({
            $and: [
              { email: email },
              { password: password }
            ]
          });
          user = user? { ...user._doc, role: 'employer' }: null;
          console.log('User employer:', user);
        }
        
        
    if (user) {
        delete user.password;
    }

    console.log('User logged in:', user);
    return response.json(user)
  }
}
