"use client"
import React, { useEffect, useState } from 'react'
import Leftside from './components/Leftside'
import PersonalInformation from './components/PersonalInformation'
import { useRouter } from 'next/navigation'
import { verifyAuth } from '@/components/services/auth.service'
import toast from 'react-hot-toast'
import { UserProfileApiResponse, userProfilePayloadType } from '../../../../../types/updateProfileResponse'



import { motion } from 'framer-motion'
import { ArrowLeft, User, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

const StudentProfile = () => {
  const [userProfile, setUserProfile] = useState<userProfilePayloadType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response: UserProfileApiResponse = await verifyAuth();
        if (response?.status === "success" && response?.data) {
          setUserProfile(response.data);
        }
      } catch (error: any) {
        console.log(error.message);
        toast.error("Failed to load profile data");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className='mx-auto mt-[80px] max-w-6xl px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-4">
              <User className="h-3 w-3" />
              <span>Identity Hub</span>
            </div>
            <h1 className='text-5xl font-black text-foreground tracking-tight italic'>Your Profile</h1>
          </div>

          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="group font-black text-muted-foreground hover:text-primary transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Home
          </Button>
        </div>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className='lg:col-span-4'
        >
          <Leftside userProfile={userProfile} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className='lg:col-span-8'
        >
          <PersonalInformation setUserProfile={setUserProfile} />
        </motion.div>
      </div>
    </div>
  )
}

export default StudentProfile
