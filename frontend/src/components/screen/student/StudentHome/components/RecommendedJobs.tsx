"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building, MapPin } from 'lucide-react'
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
    <Card className="border-primary/5 shadow-md">
      <CardHeader className='flex flex-row items-center justify-between pb-6 border-b border-secondary'>
        <CardTitle className='text-xl font-bold tracking-tight'>Recommended For You</CardTitle>
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

      <CardContent className='pt-6 space-y-4'>
        {filterJobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl font-semibold text-gray-400">No Suggestions Available</p>
          </div>
        ) : (
          filterJobs.map((job) => (
            <div key={job._id} className='group border border-primary/5 rounded-xl p-5 hover:bg-secondary/20 transition-all hover:shadow-subtle'>
              <div className='flex flex-col sm:flex-row items-start justify-between gap-4'>
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 border border-secondary shadow-sm">
                    <AvatarImage src={job.companyLogo} alt={job.companyName || "Company"} />
                    <AvatarFallback className="bg-primary/5 text-primary font-bold">{job.companyName?.[0] || "C"}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{job.jobTitle}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-2 flex-wrap gap-x-3">
                      <div className="flex items-center">
                        <Building className="h-3.5 w-3.5 mr-1.5 text-primary/60" />
                        <span className="font-medium">{job.companyName}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary/60" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Badge
                    className={
                      job.jobType === "Full-Time"
                        ? "bg-primary/10 text-primary border-none shadow-none hover:bg-primary/20"
                        : "bg-emerald-100 text-emerald-800 border-none shadow-none hover:bg-emerald-200"
                    }
                  >
                    <span className='px-3 py-0.5 font-bold text-xs uppercase tracking-wider'>{job.jobType}</span>
                  </Badge>
                </div>
              </div>
              <p className='text-sm text-muted-foreground mt-4 line-clamp-2 leading-relaxed'>{job.jobDescription}</p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-secondary/50">
                <p className="text-sm font-bold text-primary">
                  Salary: <span className="text-foreground">{job.salaryRange}</span>
                </p>

                <div className="flex gap-3">
                  <Link href={`/student/JobDetails/${job._id}`}>
                    <Button variant="outline" size="sm" className="font-bold">
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/student/JobDetails/${job._id}`}>
                    <Button size="sm" className="font-bold shadow-sm">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default RecommendedJobs
