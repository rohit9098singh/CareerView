"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, Filter, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AppliedJobType } from '../../../../../../types/applyJobTypes'
import { getRecommendedJobs } from '@/components/services/job.service'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const RecommendedJobs = () => {
  const [selectedType, setSelectedType] = useState("all")
  const [recomendedjobs, setRecomendedjobs] = useState<AppliedJobType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecommendedJobs();
        if (response.status === "success") {
          setRecomendedjobs(response.data)
        }
      } catch (error: any) {
        console.log("Error fetching the data", error.message)
      }
    }
    fetchData();
  }, [])
  console.log(recomendedjobs)

  const filterJobs = selectedType === "all"
    ? recomendedjobs
    : recomendedjobs.filter((job) => job.jobType === selectedType)

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-lg'>Recommended For You</CardTitle>
        <div className='flex items-center space-x-2 relative'>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-Time">Full-Time</SelectItem>
              <SelectItem value="Part-Time">Part-Time</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {filterJobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl font-semibold text-gray-400">No Suggestions Available</p>
          </div>
        ) : (
          filterJobs.map((job) => (
            <div key={job._id} className='border rounded-lg p-4'>
              <div className='flex items-start justify-between'>
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10 mt-1">
                    <AvatarImage src={job.companyLogo} alt={job.companyName || "Company"} />
                    <AvatarFallback>{job.companyName?.[0] || "C"}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{job.jobTitle}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1 flex-wrap gap-x-2">
                      <div className="flex items-center">
                        <Building className="h-3.5 w-3.5 mr-1" />
                        <span>{job.companyName}</span>
                      </div>
                      <span className="mx-2 text-gray-400">•</span>
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Badge
                    className={
                      job.jobType === "Full-Time"
                        ? "bg-purple-100 text-purple-800 hover:bg-purple-100 py-1.5"
                        : "bg-pink-100 text-pink-800 hover:bg-pink-100 py-1.5"
                    }
                  >
                    <span className='px-4 py-0 font-semibold text-md'>{job.jobType}</span>
                  </Badge>
                </div>
              </div>
              <p className='text-sm text-gray-600 mt-3'>{job.jobDescription}</p>
              <p className="text-sm font-medium mt-3">Salary: {job.salaryRange}</p>

              <div className="flex gap-2 mt-3">
                <Link href=''>
                  <Button size="sm" className="bg-purple-900 hover:bg-purple-950">
                    Apply Now
                  </Button>
                </Link>
                <Link href=''>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default RecommendedJobs
