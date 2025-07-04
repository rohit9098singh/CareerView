"use client";
import React, { useEffect, useState } from "react";
import JobSearchHeader from "./components/JobSearchHeader";
import JobListings from "./components/JobListings";
import Sidebar from "./components/Sidebar";
import { extractSalaryMax, extractSalaryMin } from "@/lib/utils";
import { getAllJobs } from "@/components/services/job.service";

const FindJob = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [jobsData, setJobsData] = useState<any>();
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
        const data=await getAllJobs();
        setJobsData(data?.data)
    };

    fetchJobs();
  }, []);

  console.log(jobsData)
  const filteredJobs = jobsData?.filter((job:any) =>
      job?.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job?.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job?.location?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a:any, b:any) => {
      if (sortBy === "salary_high") {
        return extractSalaryMax(b.salaryRange) - extractSalaryMax(a.salaryRange);
      }
      if (sortBy === "salary_low") {
        return extractSalaryMin(a.salaryRange) - extractSalaryMin(b.salaryRange);
      }
      if (sortBy === "deadline") {
        return new Date(a.applicationDeadLine).getTime() - new Date(b.applicationDeadLine).getTime();
      }
      return 0;
    });

  return (
    <div className="mx-auto px-4 py-8 max-w-7xl mt-[64px]">
      <JobSearchHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <JobListings jobs={filteredJobs}  />
        </div>
        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default FindJob;
