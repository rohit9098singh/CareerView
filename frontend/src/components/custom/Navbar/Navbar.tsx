"use client";
import {
  BriefcaseBusiness,
  LogOut,
  Menu,
  Settings,
  User,
  User2,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { logoutUser, verifyAuth } from "@/components/services/auth.service";
import { toast } from "react-hot-toast";
import { userProfilePayloadType } from "../../../../types/updateProfileResponse";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Navbar = () => {
  const user = "student"; // Replace with actual user type logic
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<userProfilePayloadType | null>(null)
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleMenuBar = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await verifyAuth();
        if (response?.status === "success" && response?.data) {
          const data = response?.data;
          setUserData(data);
        }
      } catch (error) {
        toast.error("Failed to load profile data");
      }
    };
    fetchUserProfile();
  }, []);

  const userPlaceholder = userData?.name?.toUpperCase().split(" ").map((name) => name[0]).join("");
  

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-purple-900 shadow-md p-4 h-[64px] fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          onClick={() =>
            router.push(userData?.role === "student" ? "/student/Home" : "/admin/Home")
          }
          className="flex items-center cursor-pointer"
        >
          <BriefcaseBusiness className="mr-2 h-6 w-6 text-white" />
          <span className="font-bold text-lg text-white">CareerView</span>
        </div>

        {userData?.role === "user" ? (
          <div className="hidden sm:flex items-center gap-4 text-white">
            <p
              onClick={() => router.push("/student/Home")}
              className="hover:text-purple-300 cursor-pointer font-semibold"
            >
              Dashboard
            </p>
            <p
              onClick={() => router.push("/student/FindJob")}
              className="hover:text-purple-300 cursor-pointer font-semibold"
            >
              Find Jobs
            </p>
            <p
              onClick={() => router.push("/student/AppliedJob")}
              className="hover:text-purple-300 cursor-pointer font-semibold"
            >
              Applied Jobs
            </p>
            <p
              onClick={() => router.push("/student/saved-jobs")}
              className="hover:text-purple-300 cursor-pointer font-semibold"
            >
              Saved Jobs
            </p>
            <p
              onClick={() => setIsProfileDropDownOpen(!isProfileDropDownOpen)}
              className="flex items-center gap-2 hover:bg-gray-200 bg-gray-100 px-2 py-1 cursor-pointer rounded-md text-black"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={userData?.profilePicture || ""} alt="User Avatar" />
                <AvatarFallback className="bg-gray-500 text-white text-xs font-semibold">
                  {userPlaceholder}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Profile</span>
            </p>

          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-4 text-white">
            <p
              onClick={() => router.push("/admin/Home")}
              className="hover:text-purple-300 cursor-pointer font-semibold"
            >
              Dashboard
            </p>
            <p
              onClick={() => router.push("/admin/ManageJobs")}
              className="hover:text-purple-300 cursor-pointer font-semibold"
            >
              Manage Jobs
            </p>
            <p
              onClick={() => router.push("/admin/post-job")}
              className="hover:text-purple-300 cursor-pointer font-semibold"
            >
              Post Jobs
            </p>
            <p
              onClick={() => setIsProfileDropDownOpen(!isProfileDropDownOpen)}
              className="flex items-center gap-2 hover:bg-gray-200 bg-gray-100 px-2 py-1 cursor-pointer rounded-md text-black"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={userData?.profilePicture || ""} alt="User Avatar" />
                <AvatarFallback className="bg-purple-600 text-white text-xs font-semibold">
                  {userPlaceholder}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Profile</span>
            </p>
          </div>
        )}

        {/* Profile Dropdown */}
        {isProfileDropDownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-6 top-16 bg-white rounded-xl shadow-md w-58 p-4 z-10"
          >
            <div className="border-b pb-2 mb-2">
              <p className="font-semibold text-black">
                {userData?.email}
              </p>
              <p className="text-sm text-gray-500">
                {userData?.name}
              </p>
            </div>

            <p
              onClick={() =>
                router.push(userData?.role === "user" ? "/student/Profile" : "/admin/Profile")
              }
              className="flex items-center hover:text-purple-300 hover:bg-gray-100 cursor-pointer border-b mb-2 px-2 py-1 rounded"
            >
              <Avatar className="h-5 w-5 mr-2">
                <AvatarImage src={userData?.profilePicture || ""} alt="User Avatar" />
                <AvatarFallback className="bg-purple-600 text-white text-[10px] font-semibold">
                  {userPlaceholder}
                </AvatarFallback>
              </Avatar>
              Profile
            </p>

            <p
              onClick={() =>
                router.push(
                  userData?.role=== "user" ? "/student/settings" : "/admin/settings"
                )
              }
              className="flex items-center hover:text-purple-300 hover:bg-gray-100 cursor-pointer border-b mb-2 px-2 py-1 rounded"
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </p>
            <p
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-red-500 hover:bg-gray-100 cursor-pointer px-2 py-1 rounded"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </p>
          </div>
        )}

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white cursor-pointer" onClick={toggleMenuBar} />
          ) : (
            <Menu className="h-6 w-6 text-white cursor-pointer" onClick={toggleMenuBar} />
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-4 right-4 mt-2 rounded-lg px-4 py-8 bg-white shadow-md space-y-2"
          >
            <p className="hover:text-purple-300 cursor-pointer font-semibold">Dashboard</p>
            <p className="hover:text-purple-300 cursor-pointer font-semibold">Find Jobs</p>
            <p className="hover:text-purple-300 cursor-pointer font-semibold">Applied Jobs</p>
            <p className="hover:text-purple-300 cursor-pointer font-semibold">Profile</p>
            <div
              onClick={handleLogout}
              className="bg-red-500 w-full p-2 rounded-xl text-center cursor-pointer"
            >
              <p className="font-semibold text-white">Logout</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;