"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Eye,
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  MoreVertical,
  X,
  FileText
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import {
  getApplicationsByJobId,
  updateApplicationStatus,
} from "@/components/services/job.service";
import { Application } from "../../../../../../types/allApplicantsData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const ApplicantsTable: React.FC = () => {
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const params = useParams();
  const jobId = params.id as string;

  const fetchApplicants = useCallback(async () => {
    try {
      const response = await getApplicationsByJobId(jobId);
      if (response?.status === "success") {
        setApplicants(response.data);
      }
    } catch (error: any) {
      console.log("Error fetching applicants", error);
    }
  }, [jobId]);

  useEffect(() => {
    fetchApplicants();
  }, [jobId, fetchApplicants]);

  const handleStatusChange = async (newStatus: string, applicantId: string) => {
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

  const handleProfileClick = (applicant: Application) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  const filteredApplicants = applicants.filter(app =>
    app.applicantId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.applicantId?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-secondary"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-black text-foreground italic">Applied Talent</h2>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{applicants.length} Total Nodes Detected</p>
          </div>
        </div>

        <div className="relative group w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Filter candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-secondary/10 border-primary/5 focus:bg-background focus:border-primary/20 transition-all font-bold text-sm outline-none"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((app, index) => (
              <motion.div
                key={app._id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="group border-primary/5 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 rounded-[2rem] bg-background overflow-hidden">
                  <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex items-center gap-6 flex-1 min-w-0 w-full">
                      <Avatar className="w-16 h-16 rounded-2xl border-2 border-primary/5 ring-4 ring-primary/5">
                        <AvatarImage src={app.applicantId?.profilePicture as string} />
                        <AvatarFallback className="bg-primary/5 text-primary font-black italic text-lg">
                          {app.applicantId?.name?.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-black text-foreground tracking-tight italic group-hover:text-primary transition-colors truncate">
                          {app.applicantId?.name}
                        </h3>
                        <div className="flex items-center gap-4 text-muted-foreground font-black text-[10px] uppercase tracking-widest mt-1">
                          <span className="flex items-center gap-1.5 truncate">
                            <Mail className="h-3 w-3" /> {app.applicantId?.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 w-full md:w-auto">
                      <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">Applied Date</span>
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                          <Calendar className="h-4 w-4 text-primary/30" />
                          {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="w-full sm:w-56">
                        <Select
                          value={app.status}
                          onValueChange={(value) => handleStatusChange(value, app.applicantId?._id)}
                        >
                          <SelectTrigger className="h-12 rounded-xl border-primary/5 bg-secondary/10 font-black italic focus:ring-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-primary/10 shadow-2xl">
                            <SelectItem value="pending" className="font-bold">Pending Review</SelectItem>
                            <SelectItem value="accepted" className="font-bold text-green-600">Approve Candidate</SelectItem>
                            <SelectItem value="rejected" className="font-bold text-red-600">Reject Application</SelectItem>
                            <SelectItem value="interview-schedule" className="font-bold text-primary">Schedule Logistics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={() => handleProfileClick(app)}
                        variant="outline"
                        className="h-12 px-6 rounded-xl border-secondary hover:bg-secondary/20 transition-all font-black italic gap-2 group/btn"
                      >
                        <Eye className="h-4 w-4 opacity-50 group-hover/btn:scale-110 transition-transform" />
                        <span>Inspect</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div className="py-24 text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-black text-foreground italic mb-2">No Talent Logs</h3>
              <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Awaiting candidate protocol initialization</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Profile Inspection Modal */}
      <AnimatePresence>
        {isModalOpen && selectedApplicant && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-background border border-primary/10 shadow-2xl rounded-[3rem] overflow-hidden"
            >
              <div className="h-3 bg-primary w-full" />
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl hover:bg-secondary/50 transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>

              <div className="p-10">
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="relative mb-6">
                    <Avatar className="w-32 h-32 rounded-[2.5rem] border-4 border-primary/10 ring-8 ring-primary/5">
                      <AvatarImage src={selectedApplicant.applicantId?.profilePicture as string} />
                      <AvatarFallback className="bg-primary/5 text-primary text-3xl font-black italic">
                        {selectedApplicant.applicantId?.name?.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 p-2 bg-background rounded-2xl border border-primary/10 shadow-lg">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-foreground tracking-tight italic mb-2">
                    {selectedApplicant.applicantId?.name}
                  </h3>
                  <Badge variant="outline" className="h-7 px-4 rounded-full bg-primary/5 text-primary border-primary/10 font-bold italic">
                    Level 1 Talent Access
                  </Badge>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-5 rounded-2xl bg-secondary/10 border border-primary/5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-primary/5">
                        <Mail className="h-5 w-5 text-primary/60" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Communication Channel</p>
                        <p className="font-bold text-foreground truncate">{selectedApplicant.applicantId?.email}</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-secondary/10 border border-primary/5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-primary/5">
                        <Phone className="h-5 w-5 text-primary/60" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Direct Interface Line</p>
                        <p className="font-bold text-foreground">{selectedApplicant.applicantId?.phoneNumber || "Unlisted Node"}</p>
                      </div>
                    </div>

                    {selectedApplicant.resumeUrl && (
                      <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 group/resume">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="text-xs font-black text-primary uppercase tracking-widest pt-0.5">Asset Repository (CV)</span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            asChild
                            variant="default"
                            className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-black italic transition-all gap-2"
                          >
                            <a href={selectedApplicant.resumeUrl} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4" /> Inspect
                            </a>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="flex-1 h-12 rounded-xl border-primary/20 text-primary font-black italic hover:bg-primary/5 transition-all gap-2"
                          >
                            <a href={selectedApplicant.resumeUrl} download>
                              <Download className="h-4 w-4" /> Extract
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10">
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    variant="ghost"
                    className="w-full h-14 rounded-2xl text-muted-foreground font-black italic uppercase tracking-widest hover:bg-secondary transition-all"
                  >
                    Terminate Inspection
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApplicantsTable;
