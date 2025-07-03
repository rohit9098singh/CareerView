"use client"
import React, { useEffect, useState } from 'react'
import AdminHead from './components/AdminHead'
import AdminOverview from './components/AdminOverview'
import QuickAccess from './components/QuickAccess'
import RecentActivities from './components/TopPerformingJob'
import TopPerformingJobs from './components/TopPerformingJob'
import { verifyAuth } from '@/components/services/auth.service'
import { userProfilePayloadType } from '../../../../../types/updateProfileResponse'
import { getAdminStats } from '@/components/services/job.service'

const AdminHome = () => {
  const [user, setUser] = useState<userProfilePayloadType | null>(null)
   const [stats, setStats] = useState({
      totalJobs: 0,
      activeJobs: 0,
      totalApplicants: 0,
      pendingReview: 0,
    });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authResponse = await verifyAuth();
        if (authResponse?.data) {
          setUser(authResponse.data);
        }

        const statusResponse=await getAdminStats();
        if(statusResponse?.data){
          setStats(statusResponse?.data)
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }



    
    fetchData()
  }, [])
  console.log("is the name not comming ",user)

  console.log("what are they here ",stats)
  return (
    <div className='max-w-7xl mx-auto p-4 mt-[64px]'>
      <div className='flex flex-col gap-4'>
        <AdminHead user={user?.name ?? "User" } />
        <AdminOverview stats={stats}/>
        <QuickAccess />
        <TopPerformingJobs />
      </div>
    </div>
  )
}

export default AdminHome
