"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowLeft, LayoutGrid, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApplicantsTable from "./components/ApplicantsTable";
import { getJobDetails } from "@/components/services/job.service";
import { motion } from "framer-motion";

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
          const response = await getJobDetails(jobId as string);
          const job = response?.data?.jobDetails;
          setJobDetails(job);
        }
      } catch (error) {
        console.log("something went wrong", error)
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-t-4 border-primary rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-[80px] max-w-7xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/ManageJobs")}
          className="flex items-center gap-2 font-black italic text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Inventory Return</span>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-4">
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Detail Node Analysis</span>
            </div>
            <h1 className='text-5xl font-black text-foreground tracking-tight italic mb-2'>
              {jobDetails ? (jobDetails as any).jobTitle : "Position Intel"}
            </h1>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Granular recruitment analytics and candidate orchestration</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ApplicantsTable />
      </motion.div>
    </div>
  );
};

export default JobDetails;
