"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Share2, Copy, Calendar, MapPin, Briefcase, DollarSign, Heart, Clock, ArrowLeft, Building2, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog";
import ApplynowForm from "./components/ApplynowForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getJobDetails, saveUnsaveJob } from "@/components/services/job.service";
import toast from "react-hot-toast";

const JobDetails = () => {
  const params = useParams();
  const jobId = params?.id;
  const router = useRouter();

  const [jobDetails, setJobDetails] = useState<any>();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [appliedCount, setAppliedCount] = useState<number>(0);
  const [isApplied, setIsApplied] = useState<boolean>(false)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        if (jobId) {
          const response = await getJobDetails(jobId);
          const job = response?.data?.jobDetails;
          const count = response?.data?.appliedCount;
          const isAppliedStatus = response?.data?.isApplied;

          setIsApplied(isAppliedStatus || false)
          setJobDetails(job);
          setIsSaved(job?.isSaved || false);
          setAppliedCount(count || 0);
        }

      } catch (error: any) {
        console.log("something went wrong", error)
      }
    };

    fetchJobDetails();
  }, [jobId]);

  console.log("lets chek what all", jobDetails)



  const handleSaveJob = async () => {
    try {
      const response = await saveUnsaveJob(jobId);
      if (response?.isSaved) {
        toast.success("Job saved successfully!");
      } else {
        toast.success("Job unsaved successfully!");
      }
      setIsSaved(response?.isSaved || !isSaved);
    } catch (error: any) {
      toast.error("Something went wrong, please try again.", error);
    }
  };


  if (!jobDetails) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-[80px] max-w-5xl px-4 py-8">
      <div className="mb-8">
        <Button
          onClick={() => router.push("/student/FindJob")}
          variant="ghost"
          className="group text-muted-foreground hover:text-primary font-bold transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Explorers
        </Button>
      </div>

      <div className="flex flex-col gap-8">
        <Card className="w-full border-primary/5 shadow-2xl rounded-[2rem] overflow-hidden bg-background">
          <div className="h-3 bg-primary w-full" />

          <CardHeader className="p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-start gap-8">
                <div className="w-24 h-24 rounded-3xl bg-secondary flex items-center justify-center border-4 border-background shadow-xl p-2">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-widest px-3 py-1">
                      {jobDetails?.jobType}
                    </Badge>
                    {new Date() > new Date(jobDetails.applicationDeadLine) ? (
                      <Badge variant="destructive" className="font-black uppercase tracking-widest px-3 py-1">
                        Window Closed
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-amber-100/50 text-amber-700 border-amber-200 font-black uppercase tracking-widest px-3 py-1 flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        Due {new Date(jobDetails.applicationDeadLine).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight italic mb-2 leading-tight">
                      {jobDetails.jobTitle}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-bold text-lg">
                      <div className="flex items-center gap-2 text-primary">
                        <span className="bg-primary/10 px-3 py-1 rounded-lg uppercase tracking-wider text-sm font-black">{jobDetails.companyName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary/40" />
                        <span>{jobDetails.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary/40" />
                        <span className="text-foreground">{jobDetails.salaryRange}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start lg:self-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-12 border-secondary font-black px-6 hover:bg-secondary/20 transition-all gap-2 rounded-2xl">
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="rounded-t-[3rem] p-12">
                    <div className="max-w-xl mx-auto space-y-8">
                      <div className="text-center">
                        <DialogTitle className="text-3xl font-black text-foreground italic tracking-tight mb-2">Share this Opportunity</DialogTitle>
                        <p className="text-muted-foreground font-medium">Help a friend find their next big move.</p>
                      </div>
                      <div className="relative group">
                        <input
                          type="text"
                          value={typeof window !== "undefined" ? window.location.href : ""}
                          readOnly
                          className="w-full h-14 pl-4 pr-32 border-2 border-secondary focus:border-primary/30 transition-all rounded-2xl font-bold bg-secondary/10"
                        />
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success("Link copied to clipboard!");
                          }}
                          className="absolute right-2 top-2 h-10 px-6 font-black rounded-xl"
                        >
                          <Copy className="h-4 w-4 mr-2" /> Copy Link
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Button
                  variant="outline"
                  className={`h-12 font-black px-6 transition-all gap-2 rounded-2xl ${isSaved ? "bg-primary/5 border-primary/20" : "border-secondary hover:bg-secondary/20"
                    }`}
                  onClick={handleSaveJob}
                >
                  <Bookmark className={`h-5 w-5 ${isSaved ? "fill-primary text-primary" : ""}`} />
                  <span className={isSaved ? "text-primary" : ""}>{isSaved ? 'Saved' : 'Save Opportunity'}</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs defaultValue="description" className="w-full">
              <div className="px-8 sm:px-12 bg-secondary/10">
                <TabsList className="h-16 w-full max-w-2xl bg-transparent border-b border-secondary p-0 gap-8 justify-start">
                  <TabsTrigger
                    value="description"
                    className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-black text-sm uppercase tracking-widest text-muted-foreground data-[state=active]:text-primary transition-all px-2"
                  >
                    Context
                  </TabsTrigger>
                  <TabsTrigger
                    value="requirements"
                    className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-black text-sm uppercase tracking-widest text-muted-foreground data-[state=active]:text-primary transition-all px-2"
                  >
                    Prerequisites
                  </TabsTrigger>
                  <TabsTrigger
                    value="company"
                    className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-black text-sm uppercase tracking-widest text-muted-foreground data-[state=active]:text-primary transition-all px-2"
                  >
                    The Studio
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-8 sm:p-12">
                <TabsContent value="description" className="mt-0 focus-visible:outline-none">
                  <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-colors group-hover:bg-primary/10" />
                    <h3 className="text-3xl font-black text-foreground tracking-tight italic mb-6">About the Role</h3>
                    <p className="text-xl text-muted-foreground font-medium leading-[1.8] relative z-10">{jobDetails.JobDescription}</p>
                    <div className="mt-10 flex items-center gap-4 text-sm font-black text-primary uppercase tracking-widest border-t border-primary/10 pt-8">
                      <Clock className="h-5 w-5" />
                      <span>Posted {new Date(jobDetails.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="mt-0 focus-visible:outline-none">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-secondary/30 border border-secondary p-8 rounded-[2rem]">
                      <h3 className="text-2xl font-black text-foreground tracking-tight italic mb-6">Experience Matters</h3>
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-primary border-4 border-secondary shadow-lg">
                          <span className="text-2xl font-black">{jobDetails.experienceRequired}</span>
                        </div>
                        <div>
                          <p className="text-xl font-black text-foreground">Years of Experience</p>
                          <p className="text-muted-foreground font-medium">Relevant industry background</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary/30 border border-secondary p-8 rounded-[2rem]">
                      <h3 className="text-2xl font-black text-foreground tracking-tight italic mb-6">Skill Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {jobDetails.skills.join(",").split(",").map((skill: string, i: number) => (
                          <span key={i} className="bg-background px-4 py-2 rounded-xl text-sm font-black text-foreground border border-secondary shadow-sm">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="company" className="mt-0 focus-visible:outline-none">
                  <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="bg-background p-8 rounded-[2rem] border border-secondary shadow-xl">
                        <h3 className="text-2xl font-black text-foreground tracking-tight italic mb-4">Vision & Mission</h3>
                        <p className="text-muted-foreground font-medium leading-relaxed">{jobDetails.aboutCompany}</p>
                      </div>

                      <div className="bg-primary p-8 rounded-[2rem] text-primary-foreground shadow-2xl shadow-primary/20">
                        <h3 className="text-2xl font-black tracking-tight italic mb-4">Perks & Growth</h3>
                        <p className="text-primary-foreground/80 font-medium leading-relaxed">{jobDetails.companyBenefits}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-4">
                      <div className="bg-secondary/20 px-6 py-4 rounded-2xl border border-secondary flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-primary" />
                        <span className="font-bold text-foreground italic">Founded in {new Date(jobDetails.foundedYear).getFullYear()}</span>
                      </div>
                      <div className="bg-emerald-50 px-6 py-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
                        <Heart className="h-5 w-5 text-emerald-500" />
                        <span className="font-bold text-emerald-700 italic">{appliedCount} Explorers applied</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <div className="p-8 sm:p-12 border-t border-secondary bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                  <Heart className="h-6 w-6 fill-emerald-500" />
                </div>
                <div>
                  <p className="text-lg font-black text-foreground italic">{appliedCount} Applications</p>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Global Interest</p>
                </div>
              </div>

              {new Date() > new Date(jobDetails.applicationDeadLine) ? (
                <Button disabled size="lg" variant="destructive" className="h-16 px-12 font-black text-lg rounded-[2rem] shadow-xl grayscale opacity-50 cursor-not-allowed">
                  WINDOW CLOSED
                </Button>
              ) : isApplied ? (
                <Button disabled size="lg" className="h-16 px-12 font-black text-lg rounded-[2rem] shadow-xl bg-slate-200 text-slate-500 cursor-not-allowed border-none">
                  ALREADY APPLIED
                </Button>
              ) : (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="lg" className="h-16 px-12 font-black text-lg rounded-[2rem] shadow-2xl shadow-primary/40 group hover:scale-105 transition-all">
                      <span>SECURE ROLE</span>
                      <ChevronRight className="ml-2 h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="sm:max-w-xl p-0 overflow-y-auto">
                    <DialogTitle className="sr-only">Apply for {jobDetails.jobTitle}</DialogTitle>
                    <ApplynowForm />
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetails;
