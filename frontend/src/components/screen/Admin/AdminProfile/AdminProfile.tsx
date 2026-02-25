"use client"
import { useEffect, useState } from "react";
import { verifyAuth } from "@/components/services/auth.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import { userProfilePayloadType } from "../../../../../types/updateProfileResponse"
import { motion } from "framer-motion"
import { ArrowLeft, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminSidebar } from "./components/AdminSidebar"
import { AdminDetails } from "./components/AdminDetails"

export default function AdminProfile() {
  const [adminProfile, setAdminProfile] = useState<userProfilePayloadType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response: any = await verifyAuth();
        if (response?.status === "success" && response?.data) {
          setAdminProfile(response?.data);
        }
      } catch (error: any) {
        console.log(error.message)
        toast.error("Failed to load profile data");
      }
    }
    fetchAdminProfile();
  }, [])


  return (
    <div className="mx-auto mt-[80px] max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-4">
              <ShieldAlert className="h-3 w-3" />
              <span>Administrative Core</span>
            </div>
            <h1 className='text-5xl font-black text-foreground tracking-tight italic'>Authority Profile</h1>
          </div>

          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="group font-black text-muted-foreground hover:text-primary transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Control Center
          </Button>
        </div>
      </motion.div>

      {adminProfile && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4"
          >
            <AdminSidebar adminProfile={adminProfile} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8"
          >
            <AdminDetails adminProfile={adminProfile} />
          </motion.div>
        </div>
      )}
    </div>
  )
}
