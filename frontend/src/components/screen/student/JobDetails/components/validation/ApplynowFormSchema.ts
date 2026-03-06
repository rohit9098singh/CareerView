import { z } from "zod";

export const ApplynowFormSchema = z.object({
  resume: z
    .any()
    .refine(
      (files) => {
        // Allow undefined initially, but require FileList with files when validated
        if (files === undefined || files === null) return false;
        return files instanceof FileList && files.length > 0;
      },
      "Resume is required"
    )
    .refine(
      (files) => {
        if (!files || !(files instanceof FileList) || files.length === 0) return true;
        return files[0].size <= 5 * 1024 * 1024;
      },
      "Resume must be less than 5MB"
    )
    .refine(
      (files) => {
        if (!files || !(files instanceof FileList) || files.length === 0) return true;
        return files[0].type === "application/pdf";
      },
      "Only PDF files are accepted"
    ),
  coverLetter: z
    .string()
    .min(10, "Cover Letter must be at least 10 characters long"),
});
