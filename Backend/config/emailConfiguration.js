import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

// Validate email configuration
if (!process.env.EMAIL_USER) {
  console.error("❌ EMAIL_USER is not set in environment variables");
}
if (!process.env.EMAIL_PASSWORD) {
  console.error("❌ EMAIL_PASSWORD is not set in environment variables");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Gmail services are not ready to send emails. Please check the email configuration.");
    console.error("Error details:", error.message);
  } else {
    console.log("✅ Gmail services are ready to send emails.");
  }
});

const sendEmail = async (to, subject, body) => {
  try {
    await transporter.sendMail({
      from: `"CareerView - Job Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: body,
    });
    console.log(`✅ Email sent successfully to ${to}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    throw error;
  }                
};

export const sendVerificationToEmail = async (to, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Welcome To CareerView! Verify Your Email</h1>
      <p>Thank you for registering. Please click on the link below to verify your email address:</p>
      <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0;">Verify Email Here</a>
      <p style="color: #666; font-size: 14px;">If you didn't request this or have already verified, please ignore this email.</p>
    </div>
  `;
  return await sendEmail(to, "Please verify your email to access CareerView", html);
};

export const sendResetPasswordLinkToEmail = async (to, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">CareerView - Reset Your Password</h1>
      <p>You have requested to reset your password. Click the link below to set a new password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0;">Reset Password Here</a>
      <p style="color: #666; font-size: 14px;"><strong>This link will expire in 1 hour.</strong></p>
      <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email and your password will remain the same.</p>
    </div>
  `;
  return await sendEmail(to, "CareerView - Reset Your Password", html);
};

export const sendJobAppliedNotificationToAdmin = async (adminEmail, userName, jobTitle, coverLetter, resumeUrl) => {
  const html = `
    <h1>New Job Application</h1>
    <p><strong>${userName}</strong> has applied for <strong>${jobTitle}</strong>.</p>
    <p>Cover Letter:</p>
    <blockquote>${coverLetter}</blockquote>
    <p>Resume: <a href="${resumeUrl}">View Resume</a></p>
  `;
  await sendEmail(adminEmail, `New Application for ${jobTitle}`, html);
};

export const sendNewJobPostedToAllUsers = async (job) => {
  const users = await User.find({}, "email");
  const html = `
    <h1>New Job Posted: ${job.title}</h1>
    <p>${job.description}</p>
    <p>Location: ${job.location}</p>
    <a href="${process.env.FRONTEND_URL}/jobs/${job._id}">View Job</a>
  `;
  await Promise.all(users.map(user =>
    user.email ? sendEmail(user.email, `New Job: ${job.title}`, html) : null
  ));
};


