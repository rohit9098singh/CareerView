export type jobDataPayloadType = {
    _id: string;
    jobTitle: string;
    companyName: string;
    companyLogo: string;
    industryType: string;
    workPlace: string;
    foundedYear: string;
    location: string;
    jobType: string;
    JobStatus: string;
    salaryRange: string;
    experienceRequired: string;
    skills: string[]; 
    applicationDeadLine: string;
    companySize: string;
    JobDescription: string;
    tag: string[];
    companyBenefits: string;
    aboutCompany: string;
    postedBy: string;
    createdAt: string;
    updatedAt: string;
  };
  
  export type JobApiResponse = {
    status: "success" | "error"; 
    message: string;
    data: jobDataPayloadType[];
  };
  