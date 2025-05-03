export type TopJob = {
    _id:string;
    jobTitle: string;
    companyName: string;
    views: number;
    applicationCount: number;
  };
  
 export  type TopJobsResponse = {
    status: "success";
    message: string;
    data: TopJob[];
  };
  