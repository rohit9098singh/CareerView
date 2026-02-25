"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAllApplications,
  updateApplicationStatus,
} from "@/components/services/job.service";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  FileText,
  Mail,
  Calendar,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Camera
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type ApplicantType = {
  id: string;
  name: string;
  email: string;
  job: string;
  date: string;
  status: string;
  resumeUrl: string;
  jobId: string;
  applicantId: string;
};

const Applicants = () => {
  const [jobFilter, setJobFilter] = useState("all");
  const [applicants, setApplicants] = useState<ApplicantType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
          applicantId: item.applicantId._id,
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
      toast.error("Failed to update status");
    }
  };

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesJob = jobFilter === "all" || applicant.job === jobFilter;
    const matchesSearch = applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesJob && matchesSearch;
  });

  const jobOptions = Array.from(new Set(applicants.map((a) => a.job)));

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted': return <CheckCircle2 className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

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
              <Users className="h-3.5 w-3.5" />
              <span>Talent Pipeline</span>
            </div>
            <h1 className='text-5xl font-black text-foreground tracking-tight italic mb-2'>Candidates</h1>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Review and orchestrate recruitment flows</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative group flex-1 sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-secondary/10 border-primary/5 focus:bg-background focus:border-primary/20 transition-all font-bold text-sm outline-none"
              />
            </div>

            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="h-12 w-full sm:w-[240px] rounded-2xl border-primary/5 bg-secondary/10 font-black italic focus:ring-0 focus:ring-offset-0">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-primary" />
                  <SelectValue placeholder="Target Position" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-primary/10 shadow-2xl">
                <SelectItem value="all" className="font-bold">All Positions</SelectItem>
                {jobOptions.map((job) => (
                  <SelectItem key={job} value={job} className="font-bold">{job}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((applicant, index) => (
              <motion.div
                key={applicant.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card className="group border-primary/5 shadow-lg hover:shadow-2xl hover:border-primary/20 transition-all duration-300 rounded-[2.5rem] bg-background overflow-hidden">
                  <div className="p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
                    {/* User Info Section */}
                    <div className="flex items-center gap-6 min-w-[300px]">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:rotate-6 transition-transform">
                          <span className="text-2xl font-black text-primary italic">
                            {applicant.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div className="absolute -bottom-2 -right-2 p-1.5 bg-background rounded-xl border border-primary/10 shadow-sm">
                          <ShieldCheck className="h-4 w-4 text-primary" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-black text-foreground tracking-tight italic group-hover:text-primary transition-colors">
                          {applicant.name}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground font-black text-[11px] uppercase tracking-[0.15em] mt-1">
                          <Mail className="h-3 w-3" />
                          <span>{applicant.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Details Section */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-auto">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Applied Position</span>
                        <div className="flex items-center gap-2 ">
                          <Briefcase className="h-4 w-4 text-primary/40" />
                          <span className="font-black text-foreground italic">{applicant.job}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Application Cycle</span>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary/40" />
                          <span className="font-bold text-foreground">{applicant.date}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Stage Status</span>
                        <div className="flex items-center">
                          <Badge className={cn(
                            "group/badge h-8 px-4 font-black italic rounded-xl flex items-center gap-2 transition-all",
                            applicant.status === 'accepted' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                              applicant.status === 'rejected' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                                'bg-primary/5 text-primary border-primary/10'
                          )}>
                            {getStatusIcon(applicant.status)}
                            <span className="capitalize">{applicant.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Actions Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                      <Button
                        variant="outline"
                        onClick={() => window.open(applicant.resumeUrl, "_blank")}
                        className="h-14 px-8 rounded-2xl border-secondary hover:bg-secondary/20 transition-all gap-3 w-full sm:w-auto font-black italic group/cv"
                      >
                        <FileText className="h-5 w-5 text-primary group-hover/cv:scale-110 transition-transform" />
                        <span>Assess CV</span>
                        <ArrowUpRight className="h-4 w-4 opacity-30" />
                      </Button>

                      <div className="w-full sm:w-64">
                        <Select
                          value={applicant.status}
                          onValueChange={(value) => handleStatusChange(value, applicant.applicantId, applicant.jobId)}
                        >
                          <SelectTrigger className="h-14 rounded-2xl border-primary/5 bg-secondary/10 font-black italic focus:ring-0 focus:ring-offset-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-primary/10 shadow-2xl">
                            <SelectItem value="pending" className="font-bold">Pending Review</SelectItem>
                            <SelectItem value="accepted" className="font-bold text-green-600">Approve Candidate</SelectItem>
                            <SelectItem value="rejected" className="font-bold text-red-600">Reject Application</SelectItem>
                            <SelectItem value="interview-schedule" className="font-bold text-primary">Schedule Logistics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center"
            >
              <div className="w-24 h-24 bg-secondary/10 rounded-[3rem] flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-2xl font-black text-foreground italic mb-2">No Records Found</h3>
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Awaiting new talent acquisitions</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Applicants;
