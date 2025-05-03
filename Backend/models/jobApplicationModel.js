import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Job" },
        applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'interview-schedule'],
            default: 'pending'
          },      
        resumeUrl: { type: String, required: true },
        coverLetter: { type: String },
        alreadyApplied: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        toJSON: { getters: true }
    }
)




const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication;
