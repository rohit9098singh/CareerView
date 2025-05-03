import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().max(500, "Bio must be under 500 characters"),
  skills: z
    .array(z.string().min(1, "Each skill must be a non-empty string"))
    .min(1, "At least one skill is required")
    .max(10, "You can list up to 10 skills"),
  studyingAt: z.string().min(1, "Studying at field is required"),
  resumeUrl: z.any().optional(),
  // .refine((file) => file?.length === 1, "Resume is required"),
  profilePicture: z
    .any().optional()
    // .refine((file) => file?.length === 1, "Profile is required"),
});
