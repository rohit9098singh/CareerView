"use client"
import Pagination from '@/components/custom/Pagination/Pagination'
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

  // console.log(currentJobs)
  return (
    <div className='space-y-6'>
      {currentJobs?.map((job: any,index:number) => (
        <div
          key={index}
          className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer'
        >
          <div className='flex justify-between '>
            <h2 className="text-xl font-semibold text-gray-900">{job?.jobTitle}</h2>
            <Badge className='px-4 bg-purple-900 text-white'>{job?.location}</Badge>
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
