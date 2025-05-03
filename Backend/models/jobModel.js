import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    companyLogo: { type: String, required: true },
    industryType: { type: String, required: true },
    workPlace: { type: String, enum: ["On-site", "Hybrid", "Remote"], default: "On-site" },
    foundedYear: { type: Date, required: true },
    location: { type: String, required: true },
    jobType: { type: String, enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"], default: "Full-time" },
    JobStatus: { type: String, enum: ["active", "inActive"], default: "active" },
    salaryRange: { type: String, required: true },
    experienceRequired: { type: String, required: true },
    skills: { type: [String], default: [] },
    applicationDeadLine: { type: Date, required: true },
    companySize: { type: String, required: true },
    JobDescription: { type: String, required: true },
    tag: { type: [String] },
    companyBenefits: { type:"String"}, 
    aboutCompany: { type: String, required: true },  
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
