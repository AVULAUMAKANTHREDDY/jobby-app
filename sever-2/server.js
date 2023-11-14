const express = require("express");
const mongoose = require("mongoose");

const JobbyUsersData =require("./model/jobbyUsers");

const {jobDetails,jobs} = require("./model/jobs");

const cors = require("cors"); 

const app =express();
const port = 6600 || process.env.PORT


app.use(cors());
app.use(express.json()); 

// sending data to db 

const addJobs = async () => {
  try {
    const jobDetail = new jobDetails({
      title:"Fullstack Developer",
      rating:5,
      company_logo_url:"https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
      location:"Bangalore",
      job_description:"We are looking for full-stack engineers who can help us reach our mission of empowering the next generation. Your duties will include development, writing code, and documenting functionality. You should be able to build high-quality, innovative, and fully performing software in compliance with coding standards and technical design. ",
      employment_type:"Part Time",
      package_per_annum:"49 LPA",
      company_website_url:"https://about.meta.com/?utm_source=about.facebook.com&utm_medium=redirect",
      skills: [
        
        {
          name: "HTML 5",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
          },
          {
          name: "CSS 3",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png"
          },
          {
          name: "Javascript",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png"
          },
          {
          name: "React JS",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png"
          },
          {
          name: "Redux",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/redux-img.png"
          },
          {
          name: "NodeJs",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/nodejs-img.png"
          },
          {
          name: "SQL Lite",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/sqlite-img.png"
          },
          {
          name: "Python",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png"
          },
          {
          name: "AWS",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/aws-img.png"
          },
          {
          name: "Go",
          imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/go-img.png"
          }

        
    ],

    lifeAtCompany: {
      description: "From building the future of augmented and virtual reality at Oculus, Shanghai, to engineering the future of our apps in Singapore, there’s no limit to the impact you can make. Bring your unique perspectives and help us build for people in and around the globe to bring the world closer together.",
      imageUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/life-facebook-img.png"
    }
  });

    const savedJobDetail = await jobDetail.save();
    // Create and save a Job document that uses the same _id as the JobDetail

    const job = new jobs({
      _id: savedJobDetail._id, // Use the same _id as the JobDetail
      title:"Fullstack Developer",
      rating:5,
      company_logo_url:"https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
      location:"Bangalore",
      job_description:"We are looking for full-stack engineers who can help us reach our mission of empowering the next generation. Your duties will include development, writing code, and documenting functionality. You should be able to build high-quality, innovative, and fully performing software in compliance with coding standards and technical design. ",
      employment_type:"Part Time",
      package_per_annum:"49 LPA"
    });


    await job.save();
    await mongoose.disconnect();  
  } catch (e) {
    console.log(e);
  }
};

// addJobs() 




mongoose.connect('mongodb+srv://avula12346:umakanth123@cluster0.lyx61rf.mongodb.net/Umakanth?retryWrites=true&w=majority')
.then(()=>console.log('DB connected'))
.catch((error)=>console.log(error));


app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoures"));

app.listen(port,()=>console.log(`Server running at ${port}`));   



 
























