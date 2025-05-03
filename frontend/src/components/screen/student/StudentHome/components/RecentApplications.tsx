"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Building, MapPin, MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { AppliedJobType } from '../../../../../../types/applyJobTypes'
import { getAllAppliedJobs } from '@/components/services/job.service'
import { getJobStatusBadgeClass } from '@/components/custom/customcolor/CustomColor'

const RecentApplications = () => {
    const [jobs, setJobs] = useState<AppliedJobType[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllAppliedJobs();
                if (Array.isArray(response?.data)) {
                    setJobs(response.data);
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Something went wrong. Try again later.");
            }
        }
        fetchData();
    }, []);
    console.log("from here",jobs)

    const handleJobClick = (id: string) => {
        router.push(`/student/JobDetails/${id}`);
    };

    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-xl font-bold'>Recent Applications</CardTitle>
                <Link href={"/student/FindJob"} className='text-sm text-purple-500 flex items-center'>
                    View all <span className='ml-1'><MoveRight /></span>
                </Link>
            </CardHeader>
            <CardContent className='space-y-4'>
                {
                    jobs.slice(0, 5).map((application) => (
                        <div key={application.jobId} className='border rounded-lg p-4 cursor-pointer'>
                            <div className='flex justify-between items-start'>
                                <div>
                                    <h3 className='font-semibold'>
                                        {application.jobTitle}
                                    </h3>
                                    <div className='flex items-center text-sm text-gray-500 mt-1'>
                                        <Building className="h-3.5 w-3.5 mr-1" />
                                        <span>{application.companyName}</span>
                                        <span className="mx-2">•</span>
                                        <MapPin className="h-3.5 w-3.5 mr-1" />
                                        <span>{application.location}</span>
                                    </div>
                                    <p className='text-sm text-gray-500 mt-1'>
                                        Applied on {new Date(application.appliedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <Badge className={getJobStatusBadgeClass(application.status)}>
                                    <span className='px-4 py-1 font-semibold text-md'>
                                        {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace("-", " ")}
                                    </span>
                                </Badge>

                            </div>
                            <div className='mt-3'>
                                <Button
                                    onClick={() => handleJobClick(application.jobId)}
                                    className='w-32 border  bg-purple-900 hover:bg-purple-950 text-white cursor-pointer '
                                    variant={"outline"}
                                    size={"sm"}
                                >
                                    View job
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </CardContent>
        </Card>
    )
}

export default RecentApplications
