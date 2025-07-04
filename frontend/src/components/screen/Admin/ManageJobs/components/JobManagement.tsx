"use client"
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen, Plus } from "lucide-react";
import JobDeleteDialog from "./JobDeleteDialog";
import { getBadgeClass } from "@/components/custom/customcolor/CustomColor";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog";
import { getAllJobs } from "@/components/services/job.service";
import { jobDataPayloadType } from "../../../../../../types/fetchJobResponse";
import EditJobForm from "./EditJobForm";
import { useRouter } from "next/navigation";

export default function JobManagement() {
  const [jobs, setJobs] = useState<jobDataPayloadType[]>([]);
  const [jobToDelete, setJobToDelete] = useState<jobDataPayloadType | null>(null);
  const [selectedJob, setSelectedJob] = useState<jobDataPayloadType | null>(null); // Track selected job for editing
  // const [loading, setLoading] = useState<boolean>(false);

  const router=useRouter();

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter((job) => job._id !== id));
  };

  useEffect(() => {
    const fetchAllPostedJobs = async () => {
      // setLoading(true);
      try {
        const response = await getAllJobs();
        if (response.status === "success") {
          setJobs(response.data);
        } else {
          console.log("Error fetching the data");
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchAllPostedJobs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Management</h1>
        <Button className="bg-purple-900 hover:bg-purple-950" onClick={() => router.push("/admin/post-job")}><Plus/>Post New Job</Button>
      </div>

      <div className="border border-gray-300 max-h-[77vh] rounded-lg overflow-y-auto scrollbar-hide bg-white ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-md py-3 font-bold">Title</TableHead>
              <TableHead className="text-md font-bold py-3">Company</TableHead>
              <TableHead className="text-md font-bold py-3">Location</TableHead>
              <TableHead className="text-md font-bold py-3">Type</TableHead>
              <TableHead className="text-md font-bold py-3">Status</TableHead>
              <TableHead className="text-md font-bold py-3">Posted</TableHead>
              <TableHead className="text-md font-bold py-3">actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell   onClick={()=>router.push(`/admin/job-details/${job._id}`)} className="py-4 text-base cursor-pointer">{job.jobTitle}</TableCell>
                <TableCell className="py-4 text-base">{job.companyName}</TableCell>
                <TableCell className="py-4 text-base">{job.location}</TableCell>
                <TableCell className="py-4 text-base">{job.jobType}</TableCell>
                <TableCell className="py-4 text-base">
                  <Badge className={getBadgeClass(job.JobStatus)}>
                    {job.JobStatus}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-base">
                  {new Date(job.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-4 text-base">
                  <div className="flex space-x-2">
                    <Sheet>
                      <SheetTrigger>
                        <div
                          className="border border-gray-300 rounded-lg p-2.5 hover:bg-gray-200 cursor-pointer"
                          onClick={() => setSelectedJob(job)}
                        >
                          <SquarePen className="h-4 w-4" />
                        </div>
                      </SheetTrigger>
                      <SheetContent side="right">
                        <DialogTitle>{""}</DialogTitle>
                        {selectedJob && <EditJobForm
                          jobData={{
                            jobId:selectedJob._id || "",
                            jobTitle: selectedJob.jobTitle || "",
                            companyName: selectedJob.companyName || "",
                            industryType: selectedJob.industryType || "",
                            workPlace: selectedJob.workPlace || "",
                            foundedYear: selectedJob.foundedYear || "",
                            location: selectedJob.location || "",
                            jobType: selectedJob.jobType || "",
                            JobStatus: selectedJob.JobStatus || "", 
                            salaryRange: selectedJob.salaryRange || "",
                            experienceRequired: selectedJob.experienceRequired || "",
                            skills: Array.isArray(selectedJob.skills) ? selectedJob.skills.join(", ") : selectedJob.skills || "",
                            companySize: selectedJob.companySize || "",
                            JobDescription: selectedJob.JobDescription || "",
                            applicationDeadLine: selectedJob.applicationDeadLine || "",
                            companyBenefits: selectedJob.companyBenefits || "",
                            aboutCompany: selectedJob.aboutCompany || "",
                            companyLogo: null, 
                          }}
                        />}
                      </SheetContent>
                    </Sheet>

                    <Button
                      onClick={() => setJobToDelete(job)}
                      variant="ghost"
                      className="border rounded-lg hover:bg-gray-200 border-gray-300"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {jobToDelete && (
        <JobDeleteDialog
          job={jobToDelete}
          onCancel={() => setJobToDelete(null)}
          onConfirm={() => {
            handleDeleteJob(jobToDelete._id);
            setJobToDelete(null);
          }}
        />
      )}
    </div>
  );
}
