import { z } from "zod"

const signupFormSchema = z
  .object({
    name: z.string().min(2, { message: "Full name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(5, { message: "Password must be at least 5 characters" }),
    confirmPassword: z.string().min(5, { message: "Confirm password must be at least 8 characters" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
    role: z.enum(["user", "admin"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default signupFormSchema