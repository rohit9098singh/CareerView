import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Gmail services are not ready to send emails. Please check the email configuration.");
  } else {
    console.log(" Gmail services are ready to send emails.");
  }
});

const sendEmail = async (to, subject, body) => {
  try {
    await transporter.sendMail({
      from: `"Your BookKart" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: body,
    });
    console.log(` Email sent successfully to ${to}`);
  } catch (error) {
    console.error(` Failed to send email to ${to}:`, error);
  }
};

export const sendVerificationToEmail = async (to, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  const html = `
    <h1>Welcome To Your CarearView! Verify Your Email</h1>
    <p>Thank you for registering. Please click on the link below to verify your email address:</p>
    <a href="${verificationUrl}">Verify Email Here</a>
    <p>If you didn't request this or have already verified, please ignore this email.</p>
  `;
  await sendEmail(to, "Please verify your email to access CareerView", html);
};

export const sendResetPasswordLinkToEmail = async (to, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  const html = `
    <h1>Welcome To Your CareerView ! Reset Your Password</h1>
    <p>You have requested to reset your password. Click the link below to set a new password:</p>
    <a href="${resetUrl}">Reset Password Here!</a>
    <p>If you didn't request this, please ignore this email and your password will remain the same.</p>
  `;
  await sendEmail(to, "Please Reset Your Password", html);
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


