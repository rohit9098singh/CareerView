"use client";
import React, { useEffect, useState } from 'react';
import AppliedJobHeader from './components/AppliedJobHeader';
import AppliedjobCards from './components/AppliedjobCards';
import { getAllAppliedJobs } from '@/components/services/job.service';
import { AppliedJobType } from '../../../../../types/applyJobTypes'; 

const AppliedJob = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [appliedJobs, setAppliedJobs] = useState<AppliedJobType[]>([]); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllAppliedJobs();
        setAppliedJobs(response?.data || []);
      } catch (error: any) {
        console.log("Failed to fetch the job", error.message);
      }
    };
    fetchJobs();
  }, []);
  console.log("applied job",appliedJobs)

  const filteredJobsRequirement = appliedJobs
    .filter(job =>
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "dateDesc") {
        return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
      } else if (sortBy === "dateAsc") {
        return new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
      } else if (sortBy === "companyAsc") {
        return a.companyName.localeCompare(b.companyName);
      } else if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

  return (
    <div className='mx-auto max-w-7xl px-4 py-6 mt-[64px]'>
      <div className='flex flex-col gap-6'>
        <AppliedJobHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <AppliedjobCards jobs={filteredJobsRequirement} />
      </div>
    </div>
  );
};

export default AppliedJob;
