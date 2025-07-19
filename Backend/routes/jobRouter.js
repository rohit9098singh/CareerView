import express from "express";
import {
  adminStats,
  editJob,
  getAllAppliedJobs,
  getAllJobs,
  getAllSavedJobs,
  getJobDetails,
  getJobSuggestions,
  getLatestJobs,
  postJob,
  SaveUnsaveJobs,
  studentApplicationStats,
} from "../controllers/jobControllers.js";
import authenticateUser from "../middleware/authMiddleware.js";
import { multerMiddleware } from "../config/cloudinary.js";
import { changeApplicationStatus, applyJob, getApplicationOfJobByJobId, editProfile, getTopPerformingJobs, editAdminProfile, getAllApplications } from "../controllers/jobApplicationController.js";

const router = express.Router();

router.post( "/post-job",authenticateUser,multerMiddleware.single("companyLogo"),postJob);
router.post( "/edit-job",authenticateUser,multerMiddleware.single("companyLogo"),editJob);
router.get("/get-all-jobs",authenticateUser,getAllJobs)
router.get("/latest-jobs",getLatestJobs);
router.get("/get-recomendation",authenticateUser,getJobSuggestions)
router.get("/get-job-details/:jobId", authenticateUser, getJobDetails);
router.post("/save-unsave-job/:jobId",authenticateUser,SaveUnsaveJobs)
router.get("/getall-savedjobs",authenticateUser,getAllSavedJobs)
router.get("/get-all-applied-jobs",authenticateUser,getAllAppliedJobs)
router.get("/get-user-stats",authenticateUser,studentApplicationStats)
router.get("/get-admin-stats",authenticateUser,adminStats)


router.get("/get-applications-by-jobId/:jobId", authenticateUser, getApplicationOfJobByJobId); 
router.put("/change-application-status/:jobId", authenticateUser, changeApplicationStatus);
router.post("/apply-job/:jobId", authenticateUser, multerMiddleware.single("resumeUrl"), applyJob);
router.post("/edit-profile",authenticateUser,multerMiddleware.fields([
  { name: 'resumeUrl', maxCount: 1 },   
  { name: 'profilePicture', maxCount: 1 } 
]),editProfile)
router.post("/edit-admin-profile",authenticateUser,multerMiddleware.fields([{name:"profilePicture",maxCount:1}]),editAdminProfile)
router.get("/get-top-performing-jobs",getTopPerformingJobs)

router.get('/applications', authenticateUser, getAllApplications);

export default router;
