type Job = {
    _id: string;
    id: string;
  };
  
  type Applicant = {
    _id: string;
    name: string;
    email: string;
    phoneNumber:string | null;
    profilePicture:string | null;
    resumeUrl:string |null
    id: string;
  };
  
  export type Application = {
    _id: string;
    jobId: Job;
    applicantId: Applicant;
    status: "pending" | "accepted" | "rejected"; 
    resumeUrl: string;
    coverLetter: string;
    alreadyApplied: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
  
  export type ApplicantResponse = {
    status: string;
    message: string;
    data: Application[];
  };
  