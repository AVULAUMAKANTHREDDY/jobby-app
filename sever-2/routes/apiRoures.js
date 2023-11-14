const express = require("express");
const { jobDetails, jobs } = require("../model/jobs");

const jwt = require("jsonwebtoken");


const bcrypt = require("bcrypt");

const jwtAuth = require("../middleware/jwtAuth");

const router = express.Router(); 

router.get("/", (req, res) => {
    res.send("This is  API Routes Page")
})



router.get("/jobs", jwtAuth, async (req, res) => {
    const allJobs = await jobs.find({}); 
    res.json({ jobs: allJobs })
})



    router.get("/filterjobs", jwtAuth, async (req, res) => {
    try {
        const {employment_type, minimum_package, search } = req.query;
    
   
        const query = {};
        if (employment_type) {
            const employementTypesArray = employment_type.split(',');

            query.employment_type = { $in: employementTypesArray.map(type => new RegExp(type, 'i')) };
        }
        if (minimum_package) {
            const minpackageValue = parseFloat(minimum_package.replace(/\D+/g, ''));

            if (!isNaN(minpackageValue)) {
                query.package_per_annum = { $gte: minpackageValue } 
            }
        }
        if (search) {
            query.title = { $regex: search, $options: 'i' } 
        }


        const filteredjobs = await jobs.find(query)

        if (filteredjobs.length === 0) {
            return res.status(404).json({ message: "no job found" })
        }
        return res.json(filteredjobs)





    } catch (e) {
        console.log(e)
        return res.json({ message: "internal server error" })
    }
})





// individual job api


    router.get("/jobs/:id", jwtAuth, async (req, res) => {
    const { id } = req.params;
    const job = await jobDetails.findOne({ _id: id });
    if (!job) {
        return res.json({ message: "job not found" })
    }
   

    const jobTitle = job.title

    const similarJobs = await jobs.find({
        title: { $regex: jobTitle, $options: 'i' },
        _id: { $ne: id }
    })



    res.status(200).json({ jobDetails: job, similarJobs: similarJobs })
})



module.exports = router; 