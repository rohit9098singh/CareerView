import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, MapPin, Settings, ShieldCheck, Mail, Sparkles, Lock, ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"
import { userProfilePayloadType } from "../../../../../../types/updateProfileResponse"
import { motion } from "framer-motion"

interface PersonalInformationProps {
  adminProfile: userProfilePayloadType | null;
}

export const AdminSidebar: React.FC<PersonalInformationProps> = ({ adminProfile }) => {
  const router = useRouter();

  const userplaceholder = adminProfile?.name?.split(" ").map((n: string) => n[0]).join("") || "AD";

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
                <AvatarImage src={adminProfile?.profilePicture} alt="Admin Avatar" className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary text-4xl font-black italic">
                  {userplaceholder}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-transparent rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg z-20">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </motion.div>
          </div>

          <h2 className="text-3xl font-black text-foreground tracking-tight italic mb-2">{adminProfile?.name}</h2>
          <div className="flex items-center gap-2 text-muted-foreground font-black text-sm uppercase tracking-widest bg-secondary/30 px-4 py-1.5 rounded-full border border-secondary">
            <Mail className="h-3.5 w-3.5 text-primary" />
            <span>{adminProfile?.email}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
            <Sparkles className="absolute top-4 right-4 h-5 w-5 text-primary/20 transition-transform group-hover:rotate-12" />
            <div className="flex items-center gap-3 mb-1">
              <ShieldAlert className="h-5 w-5 text-primary" />
              <span className="text-sm font-black text-primary uppercase tracking-widest leading-none pt-0.5">Access Authorization</span>
            </div>
            <p className="text-lg font-black text-foreground italic">System Super-User</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 rounded-3xl bg-secondary/10 border border-secondary flex items-center justify-between">
              <div className="flex items-center gap-3 text-primary">
                <MapPin className="h-5 w-5" />
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Location Node</span>
              </div>
              <span className="text-sm font-bold text-foreground italic">{adminProfile?.location || "Remote Hub"}</span>
            </div>

            <motion.div
              whileHover={{ x: 5 }}
              onClick={() => router.push("/admin/settings")}
              className="p-5 rounded-3xl bg-secondary/5 border border-secondary hover:border-primary/20 hover:bg-background transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                <Settings className="h-5 w-5" />
                <span className="text-xs font-black uppercase tracking-widest">Core Configurations</span>
              </div>
              <Lock className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/40 transition-colors" />
            </motion.div>
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-secondary">
          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-6">Strategic Clearances</h3>
          <div className="flex flex-wrap gap-2">
            {["Manage Users", "Access Security Tokens", "System Audit", "Moderate Ecosystem"].map((permission, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="bg-background border-secondary hover:border-primary/30 transition-colors text-foreground font-bold px-3 py-1.5 rounded-xl cursor-default"
              >
                {permission}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}