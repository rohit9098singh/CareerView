import mongoose from "mongoose";

const { Schema } = mongoose;

const appliedJobSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: "Job" },
  status: {
    type: String,
    enum: [
      "Total Applications",
      "accepted",
      "rejected",
      "underReview",
      "applied",
    ],
    default: "applied",
  },
  isapplied: { type: Boolean, default: false },
  appliedAt: { type: Date, default: Date.now },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  resetPasswordExpires: { type: Date, default: null },
  resetPasswordToken: { type: String, default: null },
  googleId: { type: String },
  profilePicture: { type: String },
  phoneNumber: { type: String },
  location: { type: String },
  studyingAt: { type: String },
  resumeUrl: { type: String },
  bio: { type: String }, 
  skills: [{ type: String }],
  studyingAt: { type: String },
  savedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  role: { type: String, enum: ["user", "admin"], default: "user" },
  appliedJobs: [appliedJobSchema],
  // isVerified: { type: Boolean, default: false },
  // verificationToken: { type: String, default: null },
});

const User = mongoose.model("User", userSchema);

export default User;
