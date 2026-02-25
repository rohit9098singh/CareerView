"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Briefcase, DollarSign, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Pagination from "@/components/custom/Pagination/Pagination"
import { AppliedJobType } from "../../../../../../types/applyJobTypes"
import { getJobStatusBadgeClass } from "@/components/custom/customcolor/CustomColor"
import { formatDateInDDMMYYY } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
      <div className="flex items-center justify-between px-2 mb-2">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Found <span className="text-primary">{totalApplications}</span> Applications
        </p>
      </div>
      <div className="grid gap-4">
        {currentJobs.map((job) => (
          <Card
            onClick={() => { handleJobDetailsClick(job.jobId) }}
            key={job.jobId}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl border-primary/5 hover:border-primary/20 bg-background rounded-3xl"
          >
            <div className={`absolute top-0 left-0 w-2 h-full transition-all group-hover:w-3 z-10
                ${job.status === "Not Selected"
                ? "bg-destructive shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                : job.status === "Interview Scheduled"
                  ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              }`}
            />
            <CardContent className="p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-5">
                    <Avatar className="w-16 h-16 border-4 border-secondary shadow-sm transition-transform group-hover:scale-105">
                      <AvatarImage src={job?.companyLogo} alt={job?.companyName || "Company"} />
                      <AvatarFallback className="bg-primary/10 text-primary font-black text-2xl">{job?.companyName?.[0] || "C"}</AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-black text-primary uppercase tracking-wider">{job.companyName}</span>
                      </div>
                      <h2 className="text-2xl font-black text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors">{job.jobTitle}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-bold text-sm pt-1">
                        <div className="flex items-center">
                          <MapPin className="mr-1.5 h-4 w-4 text-primary/60" />
                          <span>{job.location}</span>
                        </div>
                        <span className="text-muted-foreground/30 hidden sm:block">•</span>
                        <div className="flex items-center text-primary">
                          <Calendar className="mr-1.5 h-4 w-4" />
                          <span>Applied {formatDateInDDMMYYY(job.appliedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm ${getJobStatusBadgeClass(job.status)}`}>
                    {job.status}
                  </div>
                </div>

                <p className="text-muted-foreground text-base font-medium line-clamp-2 leading-relaxed bg-secondary/20 p-4 rounded-2xl border border-secondary/50">
                  {job.jobDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                  {job?.skills[0]?.split(',').map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs font-black bg-secondary/80 text-muted-foreground px-3 py-1.5 rounded-xl border border-secondary transition-colors"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-secondary mt-2">
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 bg-secondary/30 px-4 py-2 rounded-2xl border border-secondary flex-1">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="text-sm font-black text-foreground whitespace-nowrap">{job.jobType}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/30 px-4 py-2 rounded-2xl border border-secondary flex-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-sm font-black text-foreground whitespace-nowrap">{job.salaryRange}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => { handleJobDetailsClick(job.jobId) }}
                    className="h-12 px-8 font-black shadow-lg rounded-2xl group-hover:translate-x-1 transition-transform ml-auto"
                  >
                    <span>View Full Details</span>
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
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
