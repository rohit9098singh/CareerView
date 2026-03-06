import response from "../utils/responseHandler.js";
import { uploadFileToCloudinary } from "../config/cloudinary.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import JobApplication from "../models/jobApplicationModel.js";

export const applyJob = async (req, res) => {
  const { jobId } = req.params;
  const applicantId = req.id;
  const { coverLetter } = req.body;
  let resumeUrl = "";

  try {
    console.log("=== APPLY JOB BACKEND CALLED ===");
    console.log("Job ID:", jobId);
    console.log("Applicant ID:", applicantId);
    console.log("Request body keys:", Object.keys(req.body));
    console.log("Cover Letter:", coverLetter);
    console.log("File received:", req.file ? req.file.originalname : "No file");
    console.log("File details:", req.file ? { 
      fieldname: req.file.fieldname, 
      originalname: req.file.originalname, 
      mimetype: req.file.mimetype, 
      size: req.file.size 
    } : "None");

    if (req.file) {
      try {
        console.log("Uploading resume to Cloudinary...");
        const result = await uploadFileToCloudinary(req.file);
        resumeUrl = result.secure_url;
        console.log("Resume uploaded successfully:", resumeUrl);
      } catch (uploadError) {
        console.error("Cloudinary upload failed for resume:", uploadError);
        return response(res, 500, "Failed to upload resume to Cloudinary", uploadError.message);
      }
    } else if (req.body.resumeUrl) {
      console.log("Using resumeUrl from body:", req.body.resumeUrl);
      resumeUrl = req.body.resumeUrl;
    } else {
      console.error("No file received in req.file and no resumeUrl in req.body!");
    }

    if (!resumeUrl) {
      console.error("Resume validation failed - no resume URL available");
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

    return response(res, 201, "Job applied successfully", application);
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error", error.message);
  }
};


export const getApplicationOfJobByJobId = async (req, res) => {
  const { jobId } = req.params;
  const adminId = req.id;
  console.log("Fetching applications for jobId:", jobId);

  try {
    // Verify the job exists and belongs to this admin
    const job = await Job.findById(jobId);
    
    if (!job) {
      return response(res, 404, "Job not found");
    }

    // Check if the logged-in user is the one who posted this job
    if (job.postedBy.toString() !== adminId) {
      return response(res, 403, "Access denied. You can only view applications for jobs you posted.");
    }

    const applications = await JobApplication.find({ jobId })
      .populate({
        path: "applicantId",
        select: "name email phoneNumber profilePicture resumeUrl",
      })
      .populate({
        path: "jobId",
        select: "jobTitle",
      });

    console.log(`Found ${applications.length} applications for job ${jobId}`);

    return response(res, 200, "All Applicants for this job fetched successfully", applications);
  } catch (error) {
    console.error("Error in getApplicationOfJobByJobId:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching applications by jobId",
      error: error.message,
    });
  }
};



export const changeApplicationStatus = async (req, res) => {
  const { jobId } = req.params;
  const { status, applicantId } = req.body;
  const adminId = req.id;

  const validStatuses = ["pending", "accepted", "rejected", "interview-schedule"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status provided" });
  }

  try {
    // Verify the job exists and belongs to this admin
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the logged-in user is the one who posted this job
    if (job.postedBy.toString() !== adminId) {
      return res.status(403).json({ message: "Access denied. You can only manage applications for jobs you posted." });
    }

    const application = await JobApplication.findOne({ applicantId, jobId });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update status in JobApplication collection
    application.status = status;
    await application.save();

    // Update status in User's appliedJobs array
    await User.updateOne(
      { _id: applicantId, "appliedJobs.jobId": jobId },
      { $set: { "appliedJobs.$.status": status } }
    );

    res.status(200).json({ message: "Application status updated", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// API to edit the user's profile
export const editProfile = async (req, res) => {
  const userId = req.id;
  const { name, phoneNumber, location, bio, skills, studyingAt } = req.body;
  let profilePhotoUrl = "";
  let userResumeUrl = "";

  try {
    console.log("=== EDIT PROFILE BACKEND CALLED ===");
    console.log("User ID:", userId);
    console.log("Request body keys:", Object.keys(req.body));
    console.log("Files received:", req.files ? Object.keys(req.files) : "No files");
    
    if (req.files && req.files.profilePicture && req.files.profilePicture.length > 0) {
      try {
        console.log("Uploading profile picture to Cloudinary...");
        const result = await uploadFileToCloudinary(req.files.profilePicture[0]);
        profilePhotoUrl = result.secure_url;
        console.log("Profile picture uploaded successfully:", profilePhotoUrl);
      } catch (uploadError) {
        console.error("Cloudinary upload failed for profile photo:", uploadError);
        return response(res, 500, "Failed to upload profile photo to Cloudinary", uploadError.message);
      }
    }

    if (req.files && req.files.resumeUrl && req.files.resumeUrl.length > 0) {
      try {
        console.log("Uploading resume to Cloudinary...");
        const result = await uploadFileToCloudinary(req.files.resumeUrl[0]);
        userResumeUrl = result.secure_url;
        console.log("Resume uploaded successfully:", userResumeUrl);
      } catch (uploadError) {
        console.error("Cloudinary upload failed for user resume:", uploadError);
        return response(res, 500, "Failed to upload resume to Cloudinary", uploadError.message);
      }
    } else {
      console.log("No resume file in request");
    }

    const user = await User.findById(userId);
    if (!user) {
      return response(res, 404, "User not found");
    }

    // Parse skills if it's a JSON string
    let parsedSkills = skills;
    if (typeof skills === 'string') {
      try {
        parsedSkills = JSON.parse(skills);
      } catch (e) {
        // If it's not JSON, treat it as a single skill or comma-separated
        parsedSkills = skills.includes(',') ? skills.split(',').map(s => s.trim()) : [skills];
      }
    }

    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.location = location || user.location;
    user.bio = bio || user.bio;
    user.skills = parsedSkills || user.skills;
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
        console.error("Cloudinary upload failed for admin profile photo:", uploadError);
        return response(res, 500, "Failed to upload profile photo to Cloudinary", uploadError.message);
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
    const adminId = req.id;
    const admin = await User.findById(adminId);

    if (!admin) {
      return response(res, 404, "Admin not found");
    }

    if (admin.role !== "admin") {
      return response(res, 403, "Access denied. Only admins can view top performing jobs.");
    }

    // Step 1: Get only jobs posted by this admin
    const jobs = await Job.find({ postedBy: adminId }).select("jobTitle companyName views");

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

export const getAllApplications = async (req, res) => {
  try {
    const adminId = req.id;
    const admin = await User.findById(adminId);

    if (!admin) {
      return response(res, 404, "Admin not found");
    }

    if (admin.role !== "admin") {
      return response(res, 403, "Access denied. Only admins can view applications.");
    }

    // Get only jobs posted by this admin
    const adminJobs = await Job.find({ postedBy: adminId }).select("_id");
    const adminJobIds = adminJobs.map(job => job._id);

    // Fetch applications only for this admin's jobs
    const applications = await JobApplication.find({ 
      jobId: { $in: adminJobIds } 
    })
      .populate("applicantId", "name email")
      .populate("jobId", "jobTitle companyName")
      .sort({ createdAt: -1 })

    return response(res, 200, "Application fetched Successfully", applications)
  } catch (error) {
    return response(res, 500, error.message)
  }
}
