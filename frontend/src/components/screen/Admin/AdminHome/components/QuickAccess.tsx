"use client"
import { Briefcase, User, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card';
import React from 'react'
import { useRouter } from 'next/navigation';

const quickAcessdata = [
    {
        "id": 1,
        "path": "/admin/ManageJobs",
        "title": "Job Management",
        "description": "Create, edit and manage all job postings",
        "icon": <Briefcase className='text-blue-600 h-8 w-8' />
    },
    {
        "id": 2,
        "path": "/admin/Applicants",
        "title": "Applicant Review",
        "description": "Review and manage student applications",
        "icon": <User className='text-blue-600 h-8 w-8' />
    },
    {
        "id": 3,
        "path": "/admin/Profile",
        "title": "Account Settings",
        "description": "Update your admin profile and preferences",
        "icon": <Calendar className='text-blue-600 h-8 w-8' />
    }
]

const QuickAccess = () => {
    const router = useRouter();
    return (
        <div>
            <h2 className="text-lg font-medium mb-3">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    quickAcessdata.map((data) => (
                        <Card
                            key={data.id}
                            onClick={() => { router.push(data.path) }}
                            className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <div className="mb-4">{data.icon}</div>
                                <h3 className="font-medium text-blue-600 mb-1">{data.title}</h3>
                                <p className="text-sm text-gray-500">{data.description}</p>
                            </CardContent>
                        </Card>
                    ))
                }

            </div>
        </div>
    )
}

export default QuickAccess
