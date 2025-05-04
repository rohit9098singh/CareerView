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
          className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer'
        >
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={job?.companyLogo} alt={job?.companyName || "Company"} />
                <AvatarFallback>{job?.companyName?.[0] || "C"}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">{job?.companyName}</span>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">{job?.jobTitle}</h2>
              </div>
           </div>
            <Badge className="px-4 py-1 bg-purple-900 text-white whitespace-nowrap">
              {job?.location}
            </Badge>
          </div>

          <div className="flex items-center gap-1 mt-1 text-gray-600">
            <Building className="h-4 w-4" />
            <span className="text-sm">{job?.companyName}</span>
            <span className="mx-1">•</span>
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              {job?.location}
            </span>
          </div>

          <p className="text-sm text-gray-700">
            Salary: ${job?.salaryRange?.toLocaleString("en-US")}
          </p>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {job?.JobDescription}
          </p>

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

          <Button
            onClick={() => handleJobClick(job._id)}
            className='mt-4 bg-purple-900 hover:bg-purple-950'
          >View Details</Button>
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
