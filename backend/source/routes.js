const express = require('express')
const JobController = require('./controllers/Job.js')
const TalentController = require('./controllers/Talent.js')
const EmployerController = require('./controllers/Employer.js')
const LikesController = require('./controllers/Like.js')
const DislikesController = require('./controllers/Dislike.js')

const AuthController = require('./controllers/Auth.js')

const routes = express.Router()

// routes.get('/login', AuthController.index)

routes.get('/jobs', JobController.index)
// routes.get('/talent/:talentId/likes', TalentController.index)
// routes.get('/jobs/:jobId/likes', JobController.index)

routes.post('/jobs/:jobId/likes', LikesController.store)
routes.post('/jobs/:jobId/dislikes', DislikesController.store)

routes.post('/jobs', JobController.store)
routes.post('/talent', TalentController.store)
routes.post('/employer', EmployerController.store)

module.exports = routes
