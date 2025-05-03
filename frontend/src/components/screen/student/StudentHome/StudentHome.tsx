"use client"
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import RecentApplications from './components/RecentApplications';
import RecommendedJobs from './components/RecommendedJobs';
// import ProfileCompletion from './components/ProfileCompletion';
import ApplicationStats from './components/ApplicationStats';
import { getStudentApplicationStats } from '@/components/services/job.service';
import { verifyAuth } from '@/components/services/auth.service';
import { userProfilePayloadType } from '../../../../../types/updateProfileResponse';

const StudentHome = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
  });
  const [user, setUser] = useState<userProfilePayloadType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await getStudentApplicationStats();
        if (statsResponse?.data) {
          setStats(statsResponse.data);
        }

        const authResponse = await verifyAuth();
        if (authResponse?.data) {
          setUser(authResponse.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='mx-auto p-4 max-w-7xl mt-[64px]'>
      <Header
        name={user?.name ?? "User"}
        totalApplications={stats?.totalApplications}
        underReview={stats?.underReview}
        accepted={stats?.accepted}
        rejected={stats?.rejected}
      />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
        <div className='md:col-span-2 space-y-6'>
          <RecentApplications />
          <RecommendedJobs />
        </div>
        <div className='space-y-6'>
          {/* <ProfileCompletion /> */}
          <ApplicationStats />
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
