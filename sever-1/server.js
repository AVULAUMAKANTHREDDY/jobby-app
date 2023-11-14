const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const JobbyUsersData =require("./model/jobbyUsers")
const {jobDetails,jobs} = require("./model/jobs")

const app =express();
const port = 4523 || process.env.PORT



app.use((cors()))
app.use(express.json()); 

// company_website_url:"https://about.netflix.com/en",

//sending data to db 

// const addJobs = async () => {
//   try {
//     const jobDetail = new jobDetails({
              
      
//     title:"Fullstack Developer",
//     rating:5,
//     company_logo_url:"https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
//     company_website_url:"https://about.netflix.com/en",
//     location:"Bangalore",
//     job_description:"We are looking for full-stack engineers who can help us reach our mission of empowering the next generation. Your duties will include development, writing code, and documenting functionality. You should be able to build high-quality, innovative, and fully performing software in compliance with coding standards and technical design. ",
//     employment_type:"Part Time",
//     package_per_annum:"49 LPA",
    
//       skills: [
//         {
//             name: "HTML 5",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
//             },
//             {
//             name: "CSS 3",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png"
//             },
//             {
//             name: "Javascript",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png"
//             },
//             {
//             name: "React JS",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png"
//             },
//             {
//             name: "Redux",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/redux-img.png"
//         }
//       ],

//       lifeAtCompany: {
//         description: "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
//         imageUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/life-facebook-img.png"
//       },
//     });

//     const savedJobDetail = await jobDetail.save();
//     // Create and save a Job document that uses the same _id as the JobDetail

//     const job = new jobs({
//       _id: savedJobDetail._id, // Use the same _id as the JobDetail
//       title:"Fullstack Developer",
//       rating:5,
//       company_logo_url:"https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
//       location:"Bangalore",
//       job_description:"We are looking for full-stack engineers who can help us reach our mission of empowering the next generation. Your duties will include development, writing code, and documenting functionality. You should be able to build high-quality, innovative, and fully performing software in compliance with coding standards and technical design. ",
//       employment_type:"Part Time",
//       package_per_annum:"49 LPA"
//     });
//     await job.save();
//     await mongoose.disconnect();
//   } catch (e) {
//     console.log(e);
//   }
// };

// addJobs()

mongoose.connect('mongodb+srv://avula12346:umakanth123@cluster0.lyx61rf.mongodb.net/Umakanth?retryWrites=true&w=majority')
.then(()=>console.log('DB connected'))
.catch((error)=>console.log(error));


app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoures"));

app.listen(port,()=>console.log(`Server running at ${port}`));



 
























