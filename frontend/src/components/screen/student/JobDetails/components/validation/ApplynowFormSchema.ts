import { z } from "zod";

export const ApplynowFormSchema = z.object({
  resume: z
    .any()
    .refine((file) => file?.length === 1, "Resume is required"),
  coverLetter: z
    .string()
    .min(10, "Cover Letter must be at least 10 characters long"),
});
