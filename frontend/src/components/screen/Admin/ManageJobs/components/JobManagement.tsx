"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  SquarePen,
  Plus,
  Briefcase,
  MapPin,
  Calendar,
  Building2,
  ArrowUpRight,
  Search,
  MoreVertical,
  Activity,
  Archive,
  CheckCircle2,
  Clock,
  Sparkles,
  LayoutGrid
} from "lucide-react";
import JobDeleteDialog from "./JobDeleteDialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { DialogTitle } from "@/components/ui/dialog";
import { getAllJobs } from "@/components/services/job.service";
import { jobDataPayloadType } from "../../../../../../types/fetchJobResponse";
import EditJobForm from "./EditJobForm";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function JobManagement() {
  const [jobs, setJobs] = useState<jobDataPayloadType[]>([]);
  const [jobToDelete, setJobToDelete] = useState<jobDataPayloadType | null>(null);
  const [selectedJob, setSelectedJob] = useState<jobDataPayloadType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter((job) => job._id !== id));
  };

  useEffect(() => {
    const fetchAllPostedJobs = async () => {
      try {
        const response = await getAllJobs();
        if (response.status === "success") {
          setJobs(response.data);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };
    fetchAllPostedJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    (job.jobTitle?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (job.companyName?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto mt-[80px] max-w-7xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-4">
              <Activity className="h-3.5 w-3.5" />
              <span>Job Inventory</span>
            </div>
            <h1 className='text-5xl font-black text-foreground tracking-tight italic mb-2'>Listings</h1>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Manage and scale your corporate opportunities</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-1 sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-secondary/10 border border-primary  focus:bg-background focus:border-primary/20 transition-all font-bold text-sm outline-none"
              />
            </div>

            <Button
              className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black italic shadow-lg shadow-primary/20 transition-all gap-2"
              onClick={() => router.push("/admin/post-job")}
            >
              <Plus className="h-5 w-5" />
              <span>Post New Role</span>
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card className="group border-primary/5 shadow-lg hover:shadow-2xl hover:border-primary/20 transition-all duration-300 rounded-[2.5rem] bg-background overflow-hidden h-full flex flex-col">
                  {/* Card Header Area */}
                  <div className="p-8 pb-4">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-3xl bg-secondary/20 flex items-center justify-center border border-primary/5 group-hover:rotate-6 transition-transform">
                        <Building2 className="h-8 w-8 text-primary/40" />
                      </div>
                      <Badge className={cn(
                        "h-7 px-3 font-black italic rounded-full border-none",
                        job.JobStatus?.toLowerCase() === 'active' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'
                      )}>
                        {job.JobStatus}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-black text-foreground tracking-tight italic mb-2 group-hover:text-primary transition-colors leading-tight">
                      {job.jobTitle}
                    </h3>

                    <div className="flex items-center gap-2 text-muted-foreground font-black text-[11px] uppercase tracking-widest mb-6">
                      <Building2 className="h-3 w-3" />
                      <span>{job.companyName}</span>
                    </div>
                  </div>

                  {/* Card Body Area */}
                  <div className="px-8 pb-8 flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary/30" />
                        <span className="font-bold text-foreground/70">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm justify-end">
                        <Briefcase className="h-4 w-4 text-primary/30" />
                        <span className="font-bold text-foreground/70">{job.jobType}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-secondary/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground/30" />
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 bg-secondary/5 border-t border-primary/5 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => router.push(`/admin/job-details/${job._id}`)}
                      className="flex-1 h-12 rounded-2xl font-black italic hover:bg-background hover:text-primary transition-all gap-2"
                    >
                      <LayoutGrid className="h-4 w-4 opacity-40" />
                      View Analytics
                    </Button>

                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-12 w-12 rounded-2xl hover:bg-background border border-transparent hover:border-primary/10"
                          onClick={() => setSelectedJob(job)}
                        >
                          <SquarePen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:max-w-xl p-0 border-none bg-background">
                        <DialogTitle className="sr-only">Edit Job Details</DialogTitle>
                        <div className="h-full overflow-y-auto scrollbar-hide">
                          {selectedJob && <EditJobForm
                            jobData={{
                              jobId: selectedJob._id || "",
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
                        </div>
                      </SheetContent>
                    </Sheet>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-2xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
                      onClick={() => setJobToDelete(job)}
                    >
                      <Trash2 className="h-5 w-5 text-red-500/60" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center"
            >
              <div className="w-24 h-24 bg-secondary/10 rounded-[3.5rem] flex items-center justify-center mx-auto mb-6">
                <Archive className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-2xl font-black text-foreground italic mb-2">Inventory Depleted</h3>
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No active listings match your query</p>
            </motion.div>
          )}
        </AnimatePresence>
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
