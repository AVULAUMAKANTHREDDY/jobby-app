const express = require("express");

const{jobs,jobDetails} = require("../model/jobs");
const jwtAuth = require("../middleware/jwtAuth");



const router = express.Router(); //to handle the routew in nodejs

router.get("/",(req,res)=>{
    res.send("this is API  Routes Page")
});



//all job api
router.get("/jobs", jwtAuth, async(req,res) =>{
    const alljobs = await jobs.find({});
    res.json({jobs:alljobs});
    })

    
    //filtered  jobs api

router.get("/filterjobs", jwtAuth, async(req,res)=>{
    try{
        const {employement_type,minimum_package,search}=req.query;
        console.log(employement_type,minimum_package,search)

     const Query ={};

    if(employement_type){
    const employementtypeArray = employement_type.split(',')
    Query.employment_type = {$in:employementtypeArray .map(type=>new RegExp(type,'i'))}
    }
    if(minimum_package){
    const minpackagevalue = parseFloat
    (minimum_package.replace(/\D+/g, ' '));
    if(!isNaN(minpackagevalue))
    {
    Query.package_per_annum = {$gte:minpackagevalue}
    }}
    if(search){
    Query.title = {$regex:search,$options:'i'}
    }
    console.log(Query);

    const filteredjobs = await jobs.find(Query)
    if(filteredjobs .length=== 0){
    return res.status(404).json({message:"no job found"})
    }
    return res.json (filteredjobs )
    }
       catch(e){
    console.log(e)
    return res.json({message:"internal server error"})
      }})
    
    // induvidual job api

router.get("/jobs/:id",jwtAuth, async(req,res)=>{
    const{id} = req.params;
    console.log(id)
    const job = await jobDetails.findone({_id:id})
    if(!job){
    return res.json ({message:"job not found"})
    }
    const jobTitle = job.title
    const similarjobs = await jobs .find({
    title:{$regex:jobTitle,$options:'i'},
    // title:{$RegExp:jobTitle,$options:'i'},
    _id:{$ne:id}
    })
    res.status(200).json({jobDetails:job,similarjobs:similarjobs})
    })
    


module.exports = router;