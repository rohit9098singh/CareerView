import { z } from "zod"

export const editFormSchema = z.object({
  jobId: z.string(),
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  industryType: z.string().min(1, "Industry type is required"),
  workPlace: z.string().min(1, "Workplace type is required"),
  foundedYear: z.string().min(1, "Founded year is required"),
  location: z.string().min(1, "Location is required"),
  jobType: z.string().min(1, "Job type is required"),
  JobStatus: z.string().min(1, "Job status is required"), 
  salaryRange: z.string().min(1, "Salary range is required"),
  experienceRequired: z.string().min(1, "Experience is required"),
  skills: z.string().min(1, "Skills are required"),
  companySize: z.string().min(1, "Company size is required"),
  JobDescription: z.string().min(1, "Company info is required"),
  applicationDeadLine: z.string().min(1, "Application deadline is required"),
  companyBenefits: z.string().min(1, "Company benefits are required"),
  aboutCompany: z.string().min(1, "About company is required"),
  companyLogo: z.instanceof(File).nullable() ,
})
