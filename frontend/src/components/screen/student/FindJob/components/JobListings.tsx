"use client"
import Pagination from '@/components/custom/Pagination/Pagination'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



const JOBS_PER_PAGE = 5;

const JobListings: React.FC<any> = ({ jobs }) => {


  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(jobs?.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const currentJobs = jobs?.slice(startIndex, startIndex + JOBS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }
  const handleJobClick = (id: string) => {
    router.push(`/student/JobDetails/${id}`)
  }

  // console.log("the logo might also come",jobs)
  console.log("the logo might also come", currentJobs)
  return (
    <div className='space-y-6'>
      {currentJobs?.map((job: any, index: number) => (
        <div
          key={index}
          className='bg-background p-8 rounded-3xl shadow-md border border-primary/5 hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer group relative overflow-hidden'
          onClick={() => handleJobClick(job._id)}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div className="flex items-center gap-5">
              <Avatar className="w-14 h-14 border-2 border-primary/10 group-hover:border-primary/30 transition-colors">
                <AvatarImage src={job?.companyLogo} alt={job?.companyName || "Company"} />
                <AvatarFallback className="bg-primary/10 text-primary font-black text-xl">{job?.companyName?.[0] || "C"}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">{job?.companyName}</span>
                <h2 className="text-2xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">{job?.jobTitle}</h2>
              </div>
            </div>
            <Badge variant="secondary" className="px-4 py-1.5 font-bold tracking-wide">
              {job?.location}
            </Badge>
          </div>

          <div className="flex items-center flex-wrap gap-4 mt-4 text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <Building className="h-4 w-4" />
              <span className="text-sm">{job?.companyName}</span>
            </div>
            <span className="text-muted-foreground/30 hidden sm:block">•</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{job?.location}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-lg font-black text-foreground">
              ${job?.salaryRange?.toLocaleString("en-US")}
              <span className="text-sm font-medium text-muted-foreground ml-1">/ year</span>
            </p>
          </div>

          <p className="text-muted-foreground mt-4 line-clamp-2 font-medium leading-relaxed">
            {job?.JobDescription}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {job?.skills[0]?.split(',').map((skill: string, index: number) => (
              <span
                key={index}
                className="text-xs font-black bg-secondary/50 text-muted-foreground px-3 py-1.5 rounded-xl border border-secondary"
              >
                {skill.trim()}
              </span>
            ))}
          </div>

          <Button
            className='mt-8 h-12 px-8 font-extrabold shadow-lg rounded-2xl group-hover:scale-105 transition-transform'
          >
            View Details
          </Button>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>

  )
}

export default JobListings
