"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building2, MapPin, Briefcase, DollarSign, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Pagination from "@/components/custom/Pagination/Pagination"
import { AppliedJobType } from "../../../../../../types/applyJobTypes"
import { getJobStatusBadgeClass } from "@/components/custom/customcolor/CustomColor"
import { formatDateInDDMMYYY } from "@/lib/utils"

interface Props {
  jobs: AppliedJobType[];
}

const AppliedJobCards: React.FC<Props> = ({ jobs }) => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const AppliedJobsPerPage = 3;
  const totalApplications = jobs.length
  const totalPages = Math.ceil(totalApplications / AppliedJobsPerPage)
  const startIndex = (currentPage - 1) * AppliedJobsPerPage
  const currentJobs = jobs.slice(startIndex, startIndex + AppliedJobsPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleJobDetailsClick = (id: string) => {
    router.push(`/student/JobDetails/${id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{totalApplications}</span> applications
        </p>
      </div>
      <div className="grid gap-4">
        {currentJobs.map((job) => (
          <Card onClick={() => { handleJobDetailsClick(job.jobId) }} key={job.jobId} className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer">
            <CardContent className="p-0">
              <div className="relative">
                <div className={`h-1.5 w-full
                    ${job.status === "Not Selected"
                    ? "bg-red-500"
                    : job.status === "Interview Scheduled"
                      ? "bg-green-500"
                      : "bg-amber-500"
                  }`}
                />
                <div className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1.5">
                      <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Building2 className="mr-1 h-3.5 w-3.5" />
                          <span>{job.companyName}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3.5 w-3.5" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1.5 h-4 w-4" />
                      <span>Applied on {formatDateInDDMMYYY(job.appliedAt)}</span>
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{job.jobDescription}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job?.skills[0]?.split(',').map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-sm">
                    <div className="flex gap-4">
                      <div className="flex items-center text-muted-foreground">
                        <Briefcase className="mr-1.5 h-3.5 w-3.5" />
                        <span>{job.jobType}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <DollarSign className="mr-1 h-3.5 w-3.5" />
                        <span>{job.salaryRange}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full px-3 py-1 text-xs font-medium ${getJobStatusBadgeClass(job.status)}`}>
                         {job.status}
                      </div>

                      <Button
                        onClick={() => { handleJobDetailsClick(job.jobId) }} 
                        variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default AppliedJobCards
