"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import ApplicantsTable from "./components/ApplicantsTable";
import { getJobDetails } from "@/components/services/job.service";

// const job = {
//   id: "1",
//   title: "Web Developer",
//   company: "TechVerse",
//   location: "Bangalore",
//   type: "Full-time",
//   status: "active",
//   posted: "4/29/2025",
//   description: "We are looking for a skilled web developer to join our team...",
//   requirements: "3+ years of experience with React, Next.js, and TypeScript...",
//   salary: "$80,000 - $100,000",
//   applicants: [
//     {
//       id: "a1",
//       name: "John Doe",
//       email: "john@example.com",
//       experience: "4 years",
//       status: "pending",
//       appliedDate: "5/1/2025",
//     },
//     {
//       id: "a2",
//       name: "Jane Smith",
//       email: "jane@example.com",
//       experience: "5 years",
//       status: "interviewed",
//       appliedDate: "5/1/2025",
//     },
//     {
//       id: "a3",
//       name: "Mike Johnson",
//       email: "mike@example.com",
//       experience: "3 years",
//       status: "rejected",
//       appliedDate: "4/30/2025",
//     },
//   ],
// };

const JobDetails = () => {
  const params = useParams();
  const jobId = params?.id;
  const [jobDetails, setJobDetails] = useState(null)
  const [loading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        if (jobId) {
          const response = await getJobDetails(jobId);
          const job = response?.data?.jobDetails;
          setJobDetails(job);
        }

      } catch (error) {
        console.log("something went wrong", error)
      }
    };

    fetchJobDetails();
  }, [jobId]);

  console.log("data of bhuwan", jobDetails);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-700" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mt-[70px] mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push("/admin/ManageJobs")} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Button>
      </div>
      <ApplicantsTable />
    </div>
  );
};

export default JobDetails;
