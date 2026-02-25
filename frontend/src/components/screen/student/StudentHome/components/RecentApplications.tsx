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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
            } catch (error: any) {
                console.error("Something went wrong. Try again later.", error);
            }
        }
        fetchData();
    }, []);


    const handleJobClick = (id: string) => {
        router.push(`/student/JobDetails/${id}`);
    };


    return (
        <Card className="border-primary/5 shadow-md">
            <CardHeader className='flex flex-row items-center justify-between pb-6 border-b border-secondary'>
                <CardTitle className='text-xl font-bold tracking-tight'>Recent Applications</CardTitle>
                <Link href={"/student/FindJob"} className='text-sm text-primary font-semibold flex items-center hover:opacity-80 transition-opacity'>
                    View all <MoveRight className="ml-1.5 h-4 w-4" />
                </Link>
            </CardHeader>
            <CardContent className='pt-6 space-y-4'>
                {
                    jobs.slice(0, 5).map((application) => (
                        <div key={application.jobId} className='group border border-primary/5 rounded-xl p-5 hover:bg-secondary/20 transition-all hover:shadow-subtle cursor-pointer'>
                            <div className='flex flex-col sm:flex-row justify-between items-start gap-4'>
                                <div className="flex items-start gap-4">
                                    <Avatar className="w-12 h-12 border border-secondary shadow-sm">
                                        <AvatarImage src={application.companyLogo} alt={application.companyName || "Company"} />
                                        <AvatarFallback className="bg-primary/5 text-primary font-bold">{application.companyName?.[0] || "C"}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{application.jobTitle}</h3>

                                        <div className="flex items-center text-sm text-muted-foreground mt-2 flex-wrap gap-x-3">
                                            <div className="flex items-center">
                                                <Building className="h-3.5 w-3.5 mr-1.5 text-primary/60" />
                                                <span className="font-medium">{application.companyName}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary/60" />
                                                <span>{application.location}</span>
                                            </div>
                                        </div>

                                        <p className="text-xs text-muted-foreground mt-2 font-medium">
                                            Applied on {new Date(application.appliedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                        </p>
                                    </div>
                                </div>

                                <Badge className={`${getJobStatusBadgeClass(application.status)} border-none shadow-none`}>
                                    <span className='px-3 py-0.5 font-bold text-xs uppercase tracking-wider'>
                                        {application.status.charAt(0).toUpperCase() + application.status.slice(1).replace("-", " ")}
                                    </span>
                                </Badge>

                            </div>
                            <div className='mt-5 flex justify-end'>
                                <Button
                                    onClick={() => handleJobClick(application.jobId)}
                                    className='px-6 font-bold shadow-sm'
                                    variant={"default"}
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
