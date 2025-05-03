"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Share, Bookmark, Heart, Share2 } from "lucide-react"; // Assuming you have lucide-react installed
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
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

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        if (jobId) {
          const response = await getJobDetails(jobId);
          const job = response?.data?.jobDetails;
          const count = response?.data?.appliedCount;
    
          setJobDetails(job);
          setIsSaved(job?.isSaved || false);
          setAppliedCount(count || 0); 
        }
        
      } catch (error) {
        console.log("something went wrong",error)
      }
    };
  
    fetchJobDetails();
  }, [jobId]);
  
  console.log("lets chek what all",jobDetails)


  const handleSaveJob = async () => {
    try {
      const response = await saveUnsaveJob(jobId);
      if (response?.isSaved) {
        toast.success("Job saved successfully!");
      } else {
        toast.success("Job unsaved successfully!");
      }
        setIsSaved(response?.isSaved || !isSaved);
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };
  

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto mt-[64px] max-w-6xl py-10 flex flex-col gap-6">
      <div>
        <Button onClick={() => router.push("/student/FindJob")} variant="ghost" className="mb-4">
          ← Back to Jobs
        </Button>
        <Card className="w-full mx-auto">
          <div className="flex gap-2">
            <Badge className="ml-4 bg-purple-900 text-white px-4 text-sm">{jobDetails?.jobType}</Badge>
            <p className="bg-yellow-500/50 text-yellow-700 text-sm px-4 py-1 rounded-full font-semibold shadow-md inline-block">
              Deadline: {new Date(jobDetails.applicationDeadLine).toLocaleDateString()}
            </p>
          </div>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle className="text-xl font-semibold">{jobDetails.jobTitle}</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{jobDetails.companyName}</Badge>
                <span>{jobDetails.location}</span>
                <Separator orientation="vertical" className="h-4" />
                <span>{jobDetails.salaryRange}</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Posted {new Date(jobDetails.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden md:inline">Share</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-2"
                onClick={handleSaveJob} 
              >
                {isSaved ? (
                  <Bookmark className="h-4 w-4" fill="#ff6347" /> 
                ) : (
                  <Bookmark className="h-4 w-4" fill="none" />  
                )}
                <span className="hidden md:inline">{isSaved ? 'Saved' : 'Save'}</span>
              </Button>

            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="max-w-4xl">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description" className="cursor-pointer">Description</TabsTrigger>
                <TabsTrigger value="requirements" className="cursor-pointer">Requirements</TabsTrigger>
                <TabsTrigger value="company" className="cursor-pointer">Company</TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <div className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4">Job Description</h3>
                  <p className="text-lg text-white">{jobDetails.JobDescription}</p>
                </div>
              </TabsContent>

              <TabsContent value="requirements">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white rounded-lg p-4 shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">Required Skills</h3>
                    <p className="text-sm text-white">
                      {jobDetails.skills.join(", ")}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 bg-gradient-to-r from-purple-900 to-indigo-800 border rounded-lg p-4 shadow-sm">
                    <span className="text-2xl font-semibold text-gray-800">
                      <i className="ri-time-line"></i>
                    </span>
                    <div className="flex flex-col">
                      <h4 className="text-lg font-medium text-white">Experience Required</h4>
                      <p className="text-md text-white">
                        {jobDetails.experienceRequired} years
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>


              <TabsContent value="company">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">About the Company</h3>
                    <p className="text-sm text-white">{jobDetails.aboutCompany}</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Company Benfits</h3>
                    <p className="text-sm text-white">{jobDetails.companyBenefits}</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900 to-indigo-800  p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-sm text-white">
                    <span className="font-medium">{appliedCount} people have applied to this job</span>
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900 to-indigo-800 p-4 rounded-lg shadow-md border border-gray-200">
                    <p className="text-sm text-white">
                      <strong>Founded:</strong> {new Date(jobDetails.foundedYear).getFullYear()}
                    </p>
                  </div>
                </div>

              </TabsContent>
            </Tabs>

            <div className="mt-6 py-4 border-t text-sm text-muted-foreground flex justify-between">
              <p className="flex gap-2 items-center">
                <Heart className="text-red-500 h-5 w-5" />
                <span className="font-medium">{appliedCount} people have applied to this job</span>
              </p>
              <Sheet>
                <SheetTrigger>
                  <p className="mt-2 bg-purple-900 hover:bg-purple-950 rounded-md px-5 py-2 text-white cursor-pointer">Apply Now</p>
                </SheetTrigger>
                <SheetContent side="right">
                  <DialogTitle> {""}</DialogTitle>
                  <ApplynowForm />
                </SheetContent>
              </Sheet>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDetails;
