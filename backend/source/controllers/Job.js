const Job = require("../models/Job.js");
const Employer = require("../models/Employer.js");
const Talent = require("../models/Talent.js");

module.exports = {
  async index(request, response) {
    const { user } = request.headers;

    let { tags, techs, experience, location, isRemote } = request.body;

    const talent = await Talent.findById(user);

    if (!talent) {
      response.json({ error: true, message: "User not found." });
      return;
    }

    // console.log("talent", talent, "filters", [
    //   //{ tags: { $in: tags } },
    //   // { techs: { $in: techs } },
    //   { experience: experience },
    //   { isRemote: isRemote },
    //   { location: `/${location.toLowerCase()}/` },
    //   { _id: { $nin: talent.likes } },
    //   { _id: { $nin: talent.dislikes } }
    // ]);

    let filters = [
      { _id: { $nin: talent.likes } },
      { _id: { $nin: talent.dislikes } }
    ];

    if (location) filters.push({ location: `/${location.toLowerCase()}/` });
    if (isRemote) filters.push({ isRemote });
    if (experience) filters.push({ experience });

    if (tags && tags.length > 0) {
      tags = tags.map(tag => tag.toLowerCase());
      filters.push({ tags: { $in: tags } });
    }

    if (techs && techs.length > 0) {
      techs = techs.map(tech => tech.toLowerCase());
      filters.push({ techs: { $in: techs } });
    }

    console.log('filters', filters);
    let jobs = await Job.find({
      $and: filters
    }).sort({ updatedAt: -1 });

    jobs = jobs.map(job => {
      delete job.likes;
      delete job.dislikes;
      delete job.employer;
      return job;
    });

    return response.json(jobs);
  },

  async store(request, response) {
    const { user } = request.headers;
    let {
      title,
      description,
      techs,
      tags,
      experience,
      location,
      salary,
    } = request.body;

    techs = techs.map(tech => tech.toLowerCase());
    tags = tags.map(tag => tag.toLowerCase());

    location ? location.toLowerCase() : "";

    const job = await Job.create({
      title,
      description,
      techs,
      tags,
      experience,
      location,
      salary,
      employer: user,
    });

    delete job.likes;
    delete job.dislikes;
    delete job.employer;

    console.log(`Job ${title} created with id ${job._id}.`);
    return response.json(job);
  }
};
