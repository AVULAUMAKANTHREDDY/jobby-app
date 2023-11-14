const express = require("express");
const { jobDetails, jobs } = require("../model/jobs");
// const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require("jsonwebtoken");


const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const jwtAuth = require("../middleware/jwtAuth");
const jwtAuth = require("../middleware/jwtAuth");

const router = express.Router(); // to handle the routes in node js

router.get("/", (req, res) => {
    res.send("This is  API Routes Page")
})


// all jobs

// router.get("/jobs", async(req,res)=>{
router.get("/jobs", jwtAuth, async (req, res) => {
    const allJobs = await jobs.find({}); //fetch all jobs from jobs schema
    res.json({ jobs: allJobs })
})


// filters api
//filtered  jobs api

router.get("/filterjobs", jwtAuth, async (req, res) => {
    try {
        const { employement_type, minimum_package, search } = req.query;
        console.log(employement_type, minimum_package, search)

        const Query = {};

        if (employement_type) {
            const employementtypeArray = employement_type.split(',')
            Query.employment_type = { $in: employementtypeArray.map(type => new RegExp(type, 'i')) }
        }
        if (minimum_package) {
            const minpackagevalue = parseFloat
                (minimum_package.replace(/\D+/g, ' '));
            if (!isNaN(minpackagevalue)) {
                Query.package_per_annum = { $gte: minpackagevalue }
            }
        }
        if (search) {
            Query.title = { $regex: search, $options: 'i' }
        }
        console.log(Query);

        const filteredjobs = await jobs.find(Query)
        if (filteredjobs.length === 0) {
            return res.status(404).json({ message: "no job found" })
        }
        return res.json(filteredjobs)
    }
    catch (e) {
        console.log(e)
        return res.json({ message: "internal server error" })
    }
})




// individual job api


// router.get("/jobs/:id",  async (req, res) => {
router.get("/jobs/:id", jwtAuth, async (req, res) => {
    const { id } = req.params;
    const job = await jobDetails.findOne({ _id: id });
    if (!job) {
        return res.json({ message: "job not found" })
    }
    // console.log(job)

    const jobTitle = job.title

    const similarJobs = await jobs.find({
        title: { $regex: jobTitle, $options: 'i' },
        _id: { $ne: id }
    })



    res.status(200).json({ jobDetails: job, similarJobs: similarJobs })
})



module.exports = router;