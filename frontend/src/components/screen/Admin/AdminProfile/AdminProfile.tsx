"use client"
import Link from "next/link"
import { AdminSidebar } from "./components/AdminSidebar"
import { AdminDetails } from "./components/AdminDetails"
import { useEffect, useState } from "react";
import { verifyAuth } from "@/components/services/auth.service";
import toast from "react-hot-toast";
import { UserProfileApiResponse, userProfilePayloadType } from "../../../../../types/updateProfileResponse";

export default function AdminProfile() {
  const [adminProfile, setAdminProfile] = useState<userProfilePayloadType | null >(null);
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response:UserProfileApiResponse = await verifyAuth();
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
    <div className="container mx-auto py-6 max-w-7xl  mt-[64px]">
      <div className="flex items-center gap-1 mb-6 text-lg">
        <Link href="/" className="font-bold hover:underline">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">Admin Profile</span>
      </div>
      {adminProfile! && (
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          <AdminSidebar adminProfile={adminProfile} />
          <AdminDetails adminProfile={adminProfile} setAdminProfile={setAdminProfile} />
        </div>
      )}
    </div>
  )
}



