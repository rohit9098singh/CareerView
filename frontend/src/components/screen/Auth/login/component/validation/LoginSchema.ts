import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(5, "Password must be at least 6 characters"),
});

export default loginSchema;
