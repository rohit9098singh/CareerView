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
        <div className='bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg border border-primary/10'>
            <h1 className='font-extrabold text-3xl tracking-tight italic'> Welcome Back, {name}!</h1>
            <p className='text-primary-foreground/80 mt-2 text-lg font-medium'>
                Your job search journey is progressing well. Here&apos;s a summary of your current status.
            </p>
            <div className=' grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8'>
                <Card className='bg-white/10 backdrop-blur-md border-none text-white transition-all hover:bg-white/20 active:scale-95 cursor-default'>
                    <CardContent className='p-5 flex flex-col items-center'>
                        <div className='flex justify-between w-full opacity-90 mb-3'>
                            <span className="text-xs font-bold uppercase tracking-wider">Total Applications</span>
                            <Briefcase className="h-5 w-5" />
                        </div>
                        <p className='text-4xl font-black'>{totalApplications}</p>
                    </CardContent>
                </Card>
                <Card className='bg-white/10 backdrop-blur-md border-none text-white transition-all hover:bg-white/20 active:scale-95 cursor-default'>
                    <CardContent className='p-5 flex flex-col items-center'>
                        <div className='flex justify-between w-full opacity-90 mb-3'>
                            <span className="text-xs font-bold uppercase tracking-wider">Under Review</span>
                            <Clock className="h-5 w-5" />
                        </div>
                        <p className='text-4xl font-black'>{underReview}</p>
                    </CardContent>
                </Card>
                <Card className='bg-white/10 backdrop-blur-md border-none text-white transition-all hover:bg-white/20 active:scale-95 cursor-default'>
                    <CardContent className='p-5 flex flex-col items-center'>
                        <div className='flex justify-between w-full opacity-90 mb-3'>
                            <span className="text-xs font-bold uppercase tracking-wider">Accepted</span>
                            <CheckCircle className="h-5 w-5" />
                        </div>
                        <p className='text-4xl font-black'>{accepted}</p>
                    </CardContent>
                </Card>
                <Card className='bg-white/10 backdrop-blur-md border-none text-white transition-all hover:bg-white/20 active:scale-95 cursor-default'>
                    <CardContent className='p-5 flex flex-col items-center'>
                        <div className='flex justify-between w-full opacity-90 mb-3'>
                            <span className="text-xs font-bold uppercase tracking-wider">Rejected </span>
                            <XCircle className="h-5 w-5" />
                        </div>
                        <p className='text-4xl font-black'>{rejected}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Header
