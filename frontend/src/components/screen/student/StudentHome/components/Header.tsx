import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, CheckCircle, Clock, XCircle } from 'lucide-react'
import React from 'react'

interface headerProps {
    name: string
    totalApplications: number
    underReview: number
    accepted: number
    rejected: number
}

const Header: React.FC<headerProps> = ({ name, totalApplications, underReview, accepted, rejected }) => {
    return (
        <div className='bg-purple-900 text-white p-6 rounded-lg'>
            <h1 className='font-bold text-2xl'> Welcome Back, {name}!</h1>
            <p className='text-purple-100 mt-1'>
                Your job search journey is progressing well. Here's a summary of your current status.
            </p>
            <div className=' grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4'>
               <Card className='bg-purple-400/50 border-none text-whiote '>
                  <CardContent className='p-4 flex flex-col items-center'>
                      <div className='flex justify-between w-full'>
                      <span className="text-sm">Total Applications</span>
                      <Briefcase className="h-5 w-5" />
                      </div>
                      <p className='text-3xl font-bold mt-2'>{totalApplications}</p>
                  </CardContent>
               </Card>
               <Card className='bg-purple-400/50 border-none text-whiote'>
                  <CardContent className='p-4 flex flex-col items-center'>
                      <div className='flex justify-between w-full'>
                      <span className="text-sm">Under Review</span>
                      <Clock className="h-5 w-5" />
                      </div>
                      <p className='text-3xl font-bold mt-2'>{underReview}</p>
                  </CardContent>
               </Card>
               <Card className='bg-purple-400/50 border-none text-whiote'>
                  <CardContent className='p-4 flex flex-col items-center'>
                      <div className='flex justify-between w-full'>
                      <span className="text-sm">Accepted</span>
                      <CheckCircle className="h-5 w-5" />
                      </div>
                      <p className='text-3xl font-bold mt-2'>{accepted}</p>
                  </CardContent>
               </Card>
               <Card className='bg-purple-400/50 border-none text-whiote'>
                  <CardContent className='p-4 flex flex-col items-center'>
                      <div className='flex justify-between w-full'>
                      <span className="text-sm">Rejected </span>
                      <XCircle className="h-5 w-5" />
                      </div>
                      <p className='text-3xl font-bold mt-2'>{rejected}</p>
                  </CardContent>
               </Card>
            </div>
        </div>
    )
}

export default Header
