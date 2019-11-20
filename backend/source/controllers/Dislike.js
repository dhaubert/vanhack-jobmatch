const Talent = require('../models/Talent.js')
const Job = require('../models/Job.js')

module.exports = {
    async store(request, response) {
        const { jobId } = request.params
        const { user } = request.headers

        const loggedTalent = await Talent.findById(user)
        const targetJob = await Job.findById(jobId)

        if (!targetJob) {
            return response.status(400).json({ error: 'Job not found'})
        }

        loggedTalent.dislikes.push(targetJob._id)

        await loggedTalent.save()

        console.log(`User ${loggedTalent.email} disliked ${targetJob.title}`)

        return response.json(loggedTalent)
    }
}