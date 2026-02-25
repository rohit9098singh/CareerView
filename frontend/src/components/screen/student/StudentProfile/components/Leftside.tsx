import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, MapPin, School, Mail, Star, Sparkles } from 'lucide-react'
import { userProfilePayloadType } from '../../../../../../types/updateProfileResponse'
import { verifyAuth } from '@/components/services/auth.service'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'


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

  const userPlaceholder = userInfo?.name?.split(" ").map((n: string) => n[0]).join("");


  return (
    <Card className="border-primary/5 shadow-2xl rounded-[2.5rem] overflow-hidden bg-background">
      <div className="h-4 bg-primary w-full" />
      <CardContent className="p-10">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative group mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Avatar className="w-32 h-32 border-8 border-secondary shadow-xl relative z-10">
                <AvatarImage src={userInfo?.profilePicture || ""} alt="User Avatar" className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary text-4xl font-black italic">
                  {userPlaceholder}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-transparent rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
            </motion.div>
          </div>

          <h2 className="text-3xl font-black text-foreground tracking-tight italic mb-2">{userInfo?.name}</h2>
          <div className="flex items-center gap-2 text-muted-foreground font-black text-sm uppercase tracking-widest bg-secondary/30 px-4 py-1.5 rounded-full border border-secondary">
            <Mail className="h-3.5 w-3.5 text-primary" />
            <span>{userInfo?.email}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
            <Sparkles className="absolute top-4 right-4 h-5 w-5 text-primary/20 transition-transform group-hover:rotate-12" />
            <div className="flex items-center gap-3 mb-1">
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="text-sm font-black text-primary uppercase tracking-widest leading-none pt-0.5">Professional Rank</span>
            </div>
            <p className="text-lg font-black text-foreground italic">CareerView Pioneer</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-secondary/10 border border-secondary flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Base</span>
              </div>
              <span className="text-sm font-bold text-foreground line-clamp-1 italic">{userInfo?.location || "Remote"}</span>
            </div>

            <div className="p-5 rounded-3xl bg-secondary/10 border border-secondary flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Star className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Status</span>
              </div>
              <span className="text-sm font-bold text-foreground line-clamp-1 italic">Active Explorer</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-secondary">
          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-6">Strategic Skills</h3>
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(userInfo?.skills)
              ? userInfo.skills
              : userInfo?.skills?.split(',').map((s: string) => s.trim()).filter(Boolean) || []
            ).map((skill: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-background border-secondary hover:border-primary/30 transition-colors text-foreground font-bold px-3 py-1.5 rounded-xl cursor-default"
              >
                {skill.trim()}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-10 p-6 rounded-[2rem] bg-secondary/20 border border-secondary shadow-inner">
          <div className="flex items-center gap-3 mb-2">
            <School className="h-5 w-5 text-primary" />
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Educational Hub</span>
          </div>
          <p className="text-base font-black text-foreground italic leading-tight">{userInfo?.studyingAt || "N/A"}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Leftside
