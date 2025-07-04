import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase,  MapPin, School } from 'lucide-react'
import {  userProfilePayloadType } from '../../../../../../types/updateProfileResponse'
import { verifyAuth } from '@/components/services/auth.service'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


interface PersonalInformationProps {
  userProfile: userProfilePayloadType | null;
}

const Leftside: React.FC<PersonalInformationProps> = () => {

  const [userInfo, setUserInfo] = useState<userProfilePayloadType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await verifyAuth();
        console.log("res", response);
        console.log("status", response?.status);
        if (response?.status === "success" && response?.data) {
          const data = response.data;
          setUserInfo(data);
        }
      } catch (error: any) {
        console.log("something went wrong", error.message)
      }
    }
    fetchData()

  }, [])

 const userPlaceholder=userInfo?.name?.split(" ").map((name)=>name[0]).join("");


  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={userInfo?.profilePicture || ""} alt="User Avatar" />
            <AvatarFallback className="bg-purple-900 text-white text-2xl font-semibold">
             {userPlaceholder}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold">{userInfo?.name}</h2>
          <div className="text-gray-500 mt-1">{userInfo?.email}</div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 px-4 py-2 rounded-xl shadow-md animate-fade-in">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-lg tracking-wide">Welcome to <span className="text-blue-900 font-bold">CareerView</span></span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="h-4 w-4" />
            <span>{userInfo?.location}</span>
          </div>
        </div>

        <div className="border-t mt-6 pt-4">
          <h3 className="text-sm font-medium mb-3">Top Skills :</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {userInfo?.skills[0]?.split(',').map((skill: string, index: number) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t mt-6 pt-6 flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-700 min-w-[90px]">Studying At:</h3>
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md shadow-sm border border-gray-200">
            <p className="text-sm text-blue-700 font-medium">{userInfo?.studyingAt || "N/A"}</p>
            <School className="h-5 w-5 text-blue-500" />
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default Leftside
