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

        loggedTalent.likes.push(targetJob._id)

        await loggedTalent.save()

        console.log(`User ${loggedTalent.email} liked ${targetJob.title}`)

        // if (targetJob.likes.includes(loggedDev._id)) {
        //     console.log('Match!')
        //     const loggedSocket = request.connectedUsers[user]
        //     const targetSocket = request.connectedUsers[devId]

        //     if (loggedSocket) {
        //         request.io.to(loggedSocket).emit('match', targetDev)
        //     }

        //     if (targetSocket) {
        //         request.io.to(targetSocket).emit('match', loggedDev)
        //     }
        // }

        return response.json(loggedTalent)
    }
}