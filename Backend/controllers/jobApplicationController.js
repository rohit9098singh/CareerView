import response from "../utils/responseHandler.js";
import { uploadFileToCloudinary } from "../config/cloudinary.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import JobApplication from "../models/jobApplicationModel.js";

export const applyJob = async (req, res) => {
    const {jobId}=req.params;
    const applicantId=req.id;
    const {  coverLetter } = req.body;
    let resumeUrl = "";
  
    try {
      if (req.file) {
        try {
          const result = await uploadFileToCloudinary(req.file);
          resumeUrl = result.secure_url; 
        } catch (uploadError) {
          console.error(uploadError);
          return response(res, 500, "Failed to upload resume");
        }
      }
      if (!resumeUrl) {
        return response(res, 400, "Resume is required");
      }
  
      const job = await Job.findById(jobId);
      if (!job) {
        return response(res, 404, "Job not found");
      }
  
      const user = await User.findById(applicantId);
      if (!user) {
        return response(res, 404, "Applicant not found");
      }
  
      const alreadyApplied = user.appliedJobs.some(
        (job) => job.jobId.toString() === jobId
      );
  
      if (alreadyApplied) {
        return response(res, 400, "Already applied to this job");
      }
  
      const application = await JobApplication.create({
        jobId,
        applicantId,
        resumeUrl,
        coverLetter,
        alreadyApplied: true,
      });

  
      user.appliedJobs.push({
        jobId,
        status: "applied",
        isapplied: true,
      });
  
      await user.save();
  
      return response(res, 201, "Job applied successfully",application);
    } catch (error) {
      console.error(error);
      return response(res, 500, "Internal server error", error.message);
    }
  };


  export const getApplicationOfJobByJobId = async (req, res) => {
    const { jobId } = req.params;

    try {
        const applications = await JobApplication.find({ jobId })
            .populate({
                path: "applicantId",
                select: "name email phoneNumber profilePicture resumeUrl",
            })
            .populate({
                path: "jobId",
                select: "jobTitle resumeUrl", 
            });

        return response(res, 200, "All Applicants for this job fetched successfully", applications);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching applications by jobId",
            error: error.message,
        });
    }
};

  

  export const changeApplicationStatus = async (req, res) => {
    
    const {  jobId } = req.params;
    const { status,applicantId } = req.body;
  
    if (!["pending", "accepted", "rejected", "interview-schedule"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    try {
      const application = await JobApplication.findOne({ applicantId, jobId });
  
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
  
      application.status = status;
      await application.save();
  
      await User.updateOne(
        {
          _id: applicantId,
          "appliedJobs.jobId": jobId
        },
        {
          $set: { "appliedJobs.$.status": status }
        }
      );
  
      res.status(200).json({ message: "Application status updated", application });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // API to edit the user's profile
  export const editProfile = async (req, res) => {
    const userId = req.id; 
    const { name,  phoneNumber, location, bio, skills, studyingAt } = req.body;
    let profilePhotoUrl = "";
    let userResumeUrl = "";
    
    try {
      if (req.files && req.files.profilePicture && req.files.profilePicture.length > 0) {
        try {
          const result = await uploadFileToCloudinary(req.files.profilePicture[0]);
          profilePhotoUrl = result.secure_url;
        } catch (uploadError) {
          console.error(uploadError);
          return response(res, 500, "Failed to upload profile photo");
        }
      }
  
      if (req.files && req.files.resumeUrl && req.files.resumeUrl.length > 0) {
        try {
          const result = await uploadFileToCloudinary(req.files.resumeUrl[0]); 
          userResumeUrl = result.secure_url;
        } catch (uploadError) {
          console.error(uploadError);
          return response(res, 500, "Failed to upload resume");
        }
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return response(res, 404, "User not found");
      }
  
    
      user.name = name || user.name;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.location = location || user.location;
      user.bio = bio || user.bio;
      user.skills = skills || user.skills;
      user.studyingAt = studyingAt || user.studyingAt;
      
      if (profilePhotoUrl) {
        user.profilePicture = profilePhotoUrl; 
      }
  
      if (userResumeUrl) {
        user.resumeUrl = userResumeUrl; 
      }
  
      await user.save();
      const updatedUserProfile = {
        name: user.name,
        phoneNumber: user.phoneNumber,
        location: user.location,
        bio: user.bio,
        skills: user.skills,
        studyingAt: user.studyingAt,
        profilePicture: user.profilePicture,
        resumeUrl: user.resumeUrl,
      };
        return response(res, 200, "Profile updated successfully", updatedUserProfile);
  
    } catch (error) {
      console.error(error);
      return response(res, 500, "Internal server error", error.message);
    }
  };

  export const editAdminProfile = async (req, res) => {
    const adminId = req.id;
    const { name, phoneNumber, location, bio } = req.body;
    let profilePhotoUrl = "";
  
    try {
      if (req.files && req.files.profilePicture && req.files.profilePicture.length > 0) {
        try {
          const result = await uploadFileToCloudinary(req.files.profilePicture[0]);
          profilePhotoUrl = result.secure_url;
        } catch (uploadError) {
          console.error(uploadError);
          return response(res, 500, "Failed to upload profile photo");
        }
      }
  
      const admin = await User.findById(adminId);
      if (!admin) {
        return response(res, 404, "Admin not found");
      }
  
      admin.name = name || admin.name;
      admin.phoneNumber = phoneNumber || admin.phoneNumber;
      admin.location = location || admin.location;
      admin.bio = bio || admin.bio;
  
      if (profilePhotoUrl) {
        admin.profilePicture = profilePhotoUrl;
      }
  
      await admin.save();
  
      const updatedAdminProfile = {
        name: admin.name,
        phoneNumber: admin.phoneNumber,
        location: admin.location,
        bio: admin.bio,
        profilePicture: admin.profilePicture,
      };
  
      return response(res, 200, "Admin profile updated successfully", updatedAdminProfile);
  
    } catch (error) {
      console.error(error);
      return response(res, 500, "Internal server error", error.message);
    }
  };
  
  

  export const getTopPerformingJobs = async (req, res) => {
    try {
      // Step 1: Get all jobs
      const jobs = await Job.find().select("jobTitle companyName views");
  
      // Step 2: For each job, count applications
      const jobsWithApplications = await Promise.all(
        jobs.map(async (job) => {
          const count = await JobApplication.countDocuments({ jobId: job._id });
          return {
            _id: job._id,
            jobTitle: job.jobTitle,
            companyName: job.companyName,
            views: job.views || 0,
            applicationCount: count,
          };
        })
      );
  
      // Step 3: Sort by views and applications
      const sortedJobs = jobsWithApplications.sort((a, b) => {
        if (b.views === a.views) {
          return b.applicationCount - a.applicationCount;
        }
        return b.views - a.views;
      });
  
      // Step 4: Return top 5
      const topJobs = sortedJobs.slice(0, 5);
  
      return response(res, 200, "Top jobs fetched successfully", topJobs);
    } catch (error) {
      return response(res, 500, "Internal server error", error.message);
    }
  };
  