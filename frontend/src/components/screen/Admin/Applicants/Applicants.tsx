"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAllApplications,
  updateApplicationStatus,
} from "@/components/services/job.service";
import { getStatusColor } from "./custom/Status";

type ApplicantType = {
  id: string;
  name: string;
  email: string;
  job: string;
  date: string;
  status: string;
  resumeUrl: string;
  jobId: string;
  applicantId: string; // ✅ Make sure this exists
};

const Applicants = () => {
  const [jobFilter, setJobFilter] = useState("all");
  const [applicants, setApplicants] = useState<ApplicantType[]>([]);

  const fetchApplicants = async () => {
    try {
      const response = await getAllApplications();
      if (response.status === "success") {
        const formatted: ApplicantType[] = response.data.map((item: any) => ({
          id: item._id,
          name: item.applicantId.name,
          email: item.applicantId.email,
          job: item.jobId.jobTitle,
          jobId: item.jobId._id,
          status: item.status,
          date: new Date(item.createdAt).toLocaleDateString(),
          resumeUrl: item.resumeUrl,
          applicantId: item.applicantId._id, // ✅ Fix: Add this
        }));
        setApplicants(formatted);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch applicants");
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = async (
    newStatus: string,
    applicantId: string,
    jobId: string
  ) => {
    try {
      const response = await updateApplicationStatus(jobId, {
        status: newStatus,
        applicantId,
      });
      if (response?.message) {
        toast.success(response.message);
        fetchApplicants();
      }
    } catch (err: any) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status");
    }
  };

  const filteredApplicants =
    jobFilter === "all"
      ? applicants
      : applicants.filter((applicant) => applicant.job === jobFilter);

  const jobOptions = Array.from(new Set(applicants.map((a) => a.job)));

  return (
    <div className="container mx-auto p-6 max-w-7xl mt-[64px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Applicant Management</h1>
        <Select defaultValue="all" onValueChange={(value) => setJobFilter(value)}>
          <SelectTrigger className="w-[220px] border-gray-300">
            <SelectValue placeholder="All Jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            {jobOptions.map((job) => (
              <SelectItem key={job} value={job}>
                {job}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Applicant</TableHead>
              <TableHead>Job</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{applicant.name}</span>
                      <span className="text-sm text-gray-500">
                        {applicant.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{applicant.job}</TableCell>
                  <TableCell>{applicant.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "font-normal capitalize",
                        getStatusColor(applicant.status)
                      )}
                    >
                      {applicant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center ">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => window.open(applicant.resumeUrl, "_blank")}
                      >
                        <FileTextIcon className="h-4 w-4" />
                        View CV
                      </Button>
                      <Select
                        defaultValue={applicant.status}
                        onValueChange={(value) =>
                          handleStatusChange(value, applicant.applicantId, applicant.jobId)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select job status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="interview-schedule">
                            Interview Schedule
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                  No applicants found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Applicants;
