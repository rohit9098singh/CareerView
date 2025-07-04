"use client"
import React, { useEffect, useState } from 'react'
import Leftside from './components/Leftside'
import PersonalInformation from './components/PersonalInformation'
import { useRouter } from 'next/navigation'
import { verifyAuth } from '@/components/services/auth.service'
import toast from 'react-hot-toast'
import { UserProfileApiResponse, userProfilePayloadType } from '../../../../../types/updateProfileResponse'



const StudentProfile = () => {
   const [userProfile,setUserProfile]=useState<userProfilePayloadType | null>(null);
  const router = useRouter();

 useEffect(() => {
  // 1️⃣ define it
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

  // 2️⃣ call it (once) after definition
  fetchUserProfile();
}, []); // empty deps → run only on first render

  console.log("madi",userProfile)

  console.log("lets look at hthe phone ",userProfile?.phoneNumber)
  return (
    <div className='max-w-7xl py-6 px-4 mx-auto  mt-[64px]'>
      <div className="text-sm mb-6">
        <span
          onClick={() => router.push("/")}
          className="text-lg font-bold cursor-pointer hover:underline"
        >
          Home
        </span>
        <span className="mx-1 text-gray-400">/</span>
        <span className="text-gray-500">Profile</span>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-1'>
          <Leftside userProfile={userProfile}/>
        </div>
        <div className='md:col-span-2'>
          <PersonalInformation  setUserProfile={setUserProfile}/>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
