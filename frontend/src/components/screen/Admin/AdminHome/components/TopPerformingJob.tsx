"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TopJob } from "../../../../../../types/topPerformace";
import { getTopPerformingJobs } from "@/components/services/job.service";

const TopPerformingJobs = () => {
  const [topPerforming, setTopPerforming] = useState<TopJob[]>();
  const router = useRouter();

  const handleJobDetailsRoute = (id: string) => {
    router.push(`/admin/job-details/${id}`);
  };

  useEffect(() => {
    const fetchTopJob = async () => {
      try {
        const response = await getTopPerformingJobs();
        setTopPerforming(response?.data);
      } catch (error: any) {
        console.log("Something went wrong:", error.message);
      }
    };

    fetchTopJob();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Top Performing Jobs</h2>
      <Card>
        <CardContent className="p-0">
          {topPerforming?.map((job,index:number) => (
            <div
              onClick={() => handleJobDetailsRoute(job._id)}
              key={index}
              className="flex items-center justify-between p-4 border-b last:border-b-0 cursor-pointer"
            >
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    job.applicationCount > 2 ? "bg-orange-100" : "bg-blue-100"
                  }`}
                >
                  {job.applicationCount > 2 ? (
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{job.jobTitle}</p>
                  <p className="text-sm text-gray-500">{job.companyName}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-3">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" /> {job.views} views
                    </span>
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" /> {job.applicationCount} applications
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-blue-600">
                {job.applicationCount > 2 && "Trending"}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformingJobs;
