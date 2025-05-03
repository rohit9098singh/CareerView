export interface jobType {
  id: string;
  title: string;
  company: string;
  posted: string ;
  type:string;
  location: string;
  jobMode: "on-site" | "hybrid" | "remote";
  jobtype: "full-time" | "internship" | "part-time" | "contract";
  status: "Active" | "Inactive" | "Pending" | "Completed";
}
