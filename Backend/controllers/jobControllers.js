import User from "../models/userModel.js";
import response from "../utils/responseHandler.js";
import { uploadFileToCloudinary } from "../config/cloudinary.js";
import Job from "../models/jobModel.js";
import mongoose from "mongoose";
import JobApplication from "../models/jobApplicationModel.js";

export const postJob = async (req, res) => {
  const {
    jobTitle,
    companyName,
    industryType,
    workPlace,
    foundedYear,
    location,
    jobType,
    JobStatus,
    salaryRange,
    experienceRequired,
    skills,
    applicationDeadLine,
    companySize,
    JobDescription,
    companyBenefits,
    aboutCompany,
    tag,
  } = req.body;
  let imageUrl = "";
  try {
    if (req.file) {
      try {
        const result = await uploadFileToCloudinary(req.file);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error(uploadError);
        return response(res, 500, "Failed to upload company logo");
      }
    }
    if (!imageUrl) {
      return response(res, 400, "Company logo is required");
    }

    const userId = req?.id;
    const user = await User.findById(userId);

    if (!user) {
      return response(res, 400, "User not found");
    }

    if (user.role !== "admin") {
      return response(res, 403, "You're not allowed to post the job");
    }

    const newJob = new Job({
      jobTitle,
      companyName,
      industryType,
      workPlace,
      foundedYear,
      location,
      jobType,
      JobStatus,
      salaryRange,
      experienceRequired,
      skills,
      applicationDeadLine,
      companySize,
      JobDescription,
      aboutCompany,
      companyBenefits,
      tag,
      companyLogo: imageUrl,
      postedBy: userId,

    });

    await newJob.save();

    // await sendNewJobPostedToAllUsers(newJob);
    return response(res, 201, "Job posted successfully", newJob);
  } catch (error) {
    console.error(error);
    return response(res, 500, "Failed to post the job", error.message);
  }
};

export const editJob = async (req, res) => {
  const {
    jobId, 
    jobTitle,
    companyName,
    industryType,
    workPlace,
    foundedYear,
    location,
    jobType,
    JobStatus, // Use capitalized field to match the schema
    salaryRange,
    experienceRequired,
    skills,
    applicationDeadLine,
    companySize,
    JobDescription, // Use capitalized field to match the schema
    companyBenefits,
    aboutCompany,
  } = req.body;

  let imageUrl = "";

  try {
    const userId = req?.id;
    const user = await User.findById(userId);

    if (!user) {
      return response(res, 400, "User not found");
    }

    if (user.role !== "admin") {
      return response(res, 403, "You're not allowed to edit the job");
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return response(res, 404, "Job not found");
    }

    if (job.postedBy.toString() !== userId) {
      return response(res, 403, "You can only edit jobs posted by you");
    }

    if (req.file) {
      try {
        const result = await uploadFileToCloudinary(req.file);
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error(uploadError);
        return response(res, 500, "Failed to upload company logo");
      }
    }
     
    // Updating fields only if they are provided
    job.jobTitle = jobTitle || job.jobTitle;
    job.companyName = companyName || job.companyName;
    job.industryType = industryType || job.industryType;
    job.workPlace = workPlace || job.workPlace;
    job.foundedYear = foundedYear || job.foundedYear;
    job.location = location || job.location;
    job.jobType = jobType || job.jobType;
    job.JobStatus = JobStatus || job.JobStatus; // Use capitalized field
    job.salaryRange = salaryRange || job.salaryRange;
    job.experienceRequired = experienceRequired || job.experienceRequired;
    job.skills = skills || job.skills;
    job.applicationDeadLine = applicationDeadLine || job.applicationDeadLine;
    job.companySize = companySize || job.companySize;
    job.JobDescription = JobDescription || job.JobDescription; // Use capitalized field
    job.companyBenefits = companyBenefits || job.companyBenefits;
    job.aboutCompany = aboutCompany || job.aboutCompany;
    job.companyLogo = imageUrl || job.companyLogo; // Keep existing logo if no new image uploaded

    await job.save();


    return response(res, 200, "Job updated successfully", job);
  } catch (error) {
    console.error(error);
    return response(res, 500, "Failed to update the job", error.message);
  }
};


export const getAllJobs=async(req,res)=>{
     try {
           const jobs=await Job.find();

           if(!jobs || !jobs.length===0 ){
            return response(res,200,"job not found ",[]);
           }
           return response(res,200,"All jobs fetched successfully",jobs)
     } catch (error) {
       return response(res,500,"internal server error",error.message);
     }
}

export const getLatestJobs = async (req, res) => {
  try {
    const latestJobs = await Job.find()
      .sort({ createdAt: -1 }) 
      .limit(10);

    return response(res, 200, "Latest jobs fetched successfully", latestJobs);
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};


export const getJobSuggestions = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return response(res, 404, "User not found");
    }

    const appliedJobIds = user.appliedJobs.map(job => job.jobId.toString());

    const savedJobIds = user.savedJobs.map(job => job.toString());

    const excludeIds = [...new Set([...appliedJobIds, ...savedJobIds])];

    const suggestions = await Job.find({
      _id: { $nin: excludeIds },
      JobStatus: "active",
    })
      .sort({ createdAt: -1 }) 
      .limit(10)
      .select('jobTitle companyName location jobType JobDescription salaryRange companyLogo');


    return response(res, 200, "Recommended jobs fetched successfully", suggestions);
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};





export const getJobDetails = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.id;
  try {
    const jobDetails = await Job.findById(jobId).populate(
      "postedBy",
      "name email role"
    );

    if (!jobDetails) {
      return response(res, 400, "Job not found", jobDetails.message);
    }

    const appliedCount = await JobApplication.countDocuments({ jobId });

    let isApplied=false;

    if(userId){
      const user=await User.findById(userId);

      if(user){
        isApplied=user.appliedJobs.some(
          (job)=>job.jobId.toString()=== jobId
        )
      }
    }


    return response(res, 200, "Job Details fetched successfully", {jobDetails,appliedCount,isApplied});
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};

export const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    if (!jobId) {
      return response(res, 400, "Job ID is missing to delete it");
    }

    const findJobToDelete = await Job.findByIdAndDelete(jobId);

    if (!findJobToDelete) {
      return response(res, 404, "Job not found to delete");
    }

    return response(res, 200, "Job deleted successfully", findJobToDelete);
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};

export const SaveUnsaveJobs = async (req, res) => {
  try {
    const userId = req.id;
    const { jobId } = req.params;

    if (!userId) {
      return response(res, 400, "User ID is missing");
    }
    if (!jobId) {
      return response(res, 400, "Job ID is missing");
    }

    const user = await User.findById(userId);
    if (!user) {
      return response(res, 404, "User not found");
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return response(res, 404, "Job not found");
    }

    const isSaved = user.savedJobs.includes(jobId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      isSaved
        ? { $pull: { savedJobs: jobId } }
        : { $addToSet: { savedJobs: new mongoose.Types.ObjectId(jobId) } },
      { new: true }
    ).populate({
      path: "savedJobs",
      select: "jobTitle companyName location jobType salaryRange", 
    });

    return response(
      res,
      200,
      isSaved ? "Job unsaved successfully" : "Job saved successfully",
      updatedUser.savedJobs
    );
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};

export const getAllSavedJobs = async (req, res) => {
  const userId = req.id;

  try {
    if (!userId) {
      return response(res, 400, "User ID is missing");
    }

    const user = await User.findById(userId).populate({
      path: "savedJobs",
      select: "jobTitle companyName location jobType salaryRange tags createdAt JobDescription skills", // Adjusting the fields based on your data
    });

    if (!user) {
      return response(res, 404, "User not found");
    }

    if (!user.savedJobs || user.savedJobs.length === 0) {
      return response(res, 200, "No saved jobs found", []);
    }

    return response(res, 200, "Saved jobs fetched successfully", user.savedJobs);
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};



// export const applyJob = async (req, res) => {
//   const userId = req.id;
//   const { jobId } = req.params;

//   try {
//     if (!userId) {
//       return response(res, 400, "user id missing");
//     }
//     if (!jobId) {
//       return response(res, 400, "job id is missing");
//     }
//     const user = await User.findById(userId);

//     if (!user) {
//       return response(res, 400, "user not found");
//     }

//     const job = await Job.findById(jobId);
//     if (!job) {
//       return response(res, 404, "Job not found");
//     }

//     const alreadyApplied = user.appliedJobs.some(
//       (appliedJob) => appliedJob.jobId.toString() === jobId
//     );

//     if (alreadyApplied) {
//       return response(res, 400, "Already applied for this job");
//     }

//     user.appliedJobs.push({
//       jobId,
//       status: "applied",
//       isapplied: true,
//       appliedAt: new Date(),
//     });
//     await user.save();

//     return response(res, 200, "job applied successfully", user.appliedJobs);
//   } catch (error) {
//     return response(res, 500, "internal server error",error.message);
//   }
// };

export const getAllAppliedJobs = async (req, res) => {
  const userId = req.id;

  try {
    if (!userId) {
      return response(res, 400, "user id missing");
    }

    const user = await User.findById(userId).populate({
      path: "appliedJobs.jobId", 
      select: "jobTitle companyName location jobType salaryRange JobDescription skills companyLogo" 
    }).sort({ "appliedJobs.createdAt": -1 });;

      if(!user){
        return response(res,400,"user not found",error.message);
      }

      const appliedJobs=user.appliedJobs.map((appliedJob)=>{
        return {
          jobId: appliedJob?.jobId?._id,
          jobTitle: appliedJob?.jobId?.jobTitle,
          companyName: appliedJob?.jobId?.companyName,
          location: appliedJob?.jobId?.location,
          skills:appliedJob?.jobId?.skills,
          jobType: appliedJob?.jobId?.jobType,
          salaryRange: appliedJob?.jobId.salaryRange,
          status: appliedJob?.status,
          appliedAt: appliedJob?.appliedAt,
          JobDescription:appliedJob?.jobId?.JobDescription,
          companyLogo:appliedJob?.jobId?.companyLogo
        }
      })
      return response(res,200,"Applied job fetched succesfully",appliedJobs)
  } catch (error) {
    return response(res, 500, "Internal server error", error.message);
  }
};

export const studentApplicationStats = async (req, res) => {
  const userId=req.id;

  try {
     const user=await User.findById(userId).populate("appliedJobs.jobId");

     if(!user){
      return response(res,404,"User not found")
     }

     let TotalApplications=0;
     let underReview=0;
     let accepted=0;
     let rejected=0;
     

    user.appliedJobs.forEach((aapliedJob)=>{
        TotalApplications++;
        switch(aapliedJob?.status.toLowerCase()){  
          case "applied":
            underReview++;
            break;
            case "accepted":
              accepted++;
              break;
            case "rejected":
              rejected++;
              break; 
        }
    });

    return response(res,200,"Student Stats fetched Successfully",{
      totalApplications: TotalApplications,
      underReview,
      accepted,
      rejected
    })
   
  } catch (error) {
     return response(res,500,"internal server error",error.message)
  }
};

export const adminStats=async(req,res)=>{
     try {
       const totalJobs=await Job.countDocuments();
       const activeJobs = await Job.countDocuments({ JobStatus: "active" });

       const allUser=await User.find();
       console.log(allUser)

       let totalApplicants=0;
       let pendingReview=0;

       allUser.forEach(user=>{
        totalApplicants +=user.appliedJobs.length;

        user.appliedJobs.forEach(appliedJob=>{
          if(appliedJob.status.toLowerCase()==="applied"){
            pendingReview++;
          }
        })
       });

       return response(res,200,"Admin DashBoard stats",{
        totalJobs,
        activeJobs,
        totalApplicants,
        pendingReview
       })

     } catch (error) {
        return response(res,500,"internal server error",error.message)
     }
}

