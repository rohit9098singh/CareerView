import { z } from "zod";

export const ApplynowFormSchema = z.object({
  resume: z.any().optional(),
  coverLetter: z
    .string()
    .min(10, "Cover Letter must be at least 10 characters long"),
});
