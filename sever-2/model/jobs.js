const mongoose = require("mongoose");

const {Schema} = mongoose;

const skillsSchema = new mongoose.Schema ({
    name:String,
    imageUrl:String
});

const lifeAtCompanySchema = new mongoose.Schema ({
    description:String,
    imageUrl:String
});

const jobsSchema = new mongoose.Schema ({
    title:String,
    rating:Number,
    company_logo_url:String,
    location:String,
    job_description:String,
    employment_type:String,
    package_per_annum:String
})

const jobs = mongoose.model("jobs",jobsSchema);

const jobDetailsSchema = new mongoose.Schema ({
    title:String,
    rating:Number,
    company_logo_url:String,
    location:String,
    job_description:String,
    employment_type:String,
    package_per_annum:String,
    company_website_url:String,
    skills:[skillsSchema],
    lifeAtCompany:lifeAtCompanySchema
});


const jobDetails = mongoose.model("jobDetails",jobDetailsSchema);

module.exports = {jobDetails,jobs}