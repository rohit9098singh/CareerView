import { z } from "zod";
export const adminProfileValidation = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{3,5}[-.\s]?\d{4,6}$/,
      "Invalid phone number"
    ),
  location: z.string().min(2, "Location must be at least 2 characters"),
  bio: z.string().min(10, "Note must be at least 10 characters"),
  profilePicture: z
  .any()
  .optional()
    // .any()
    // .refine((file) => file?.length === 1, "Profile is required"),
});
