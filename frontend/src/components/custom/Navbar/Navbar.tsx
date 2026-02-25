"use client";
import {
  BriefcaseBusiness,
  LogOut,
  Menu,
  Settings,
  // User,
  // User2,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { logoutUser, verifyAuth } from "@/components/services/auth.service";
import { toast } from "react-hot-toast";
import { userProfilePayloadType } from "../../../../types/updateProfileResponse";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user: userData, logout: logoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleMenuBar = () => setIsMenuOpen(!isMenuOpen);

  const userPlaceholder = userData?.name
    ? userData.name.toUpperCase().split(" ").map((name) => name[0]).join("")
    : "??";


  const handleLogout = async () => {
    try {
      if (logoutUser) {
        await logoutUser();
        toast.success("Logging out...");
        // AuthContext now handles the window.location.href = "/login"
      }
    } catch (error: any) {
      toast.error("Logout failed");
      console.error(error);
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
    <div className="bg-primary shadow-lg p-4 h-[72px] fixed top-0 w-full z-50 border-b border-primary/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        <div
          onClick={() => {
            if (userData?.role === "user") router.push("/student/Home");
            else if (userData?.role === "admin") router.push("/admin/Home");
            else router.push("/login");
          }}
          className="flex items-center cursor-pointer group"
        >
          <div className="bg-white/20 p-1.5 rounded-lg mr-3 group-hover:bg-white/30 transition-all">
            <BriefcaseBusiness className="h-6 w-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tighter text-white italic">CareerView</span>
        </div>

        {userData?.role === "user" && (
          <div className="hidden md:flex items-center gap-8 text-white/90">
            <p
              onClick={() => router.push("/student/Home")}
              className="hover:text-white cursor-pointer font-bold text-sm uppercase tracking-widest transition-all hover:scale-105"
            >
              Dashboard
            </p>
            <p
              onClick={() => router.push("/student/FindJob")}
              className="hover:text-white cursor-pointer font-bold text-sm uppercase tracking-widest transition-all hover:scale-105"
            >
              Find Jobs
            </p>
            <p
              onClick={() => router.push("/student/AppliedJob")}
              className="hover:text-white cursor-pointer font-bold text-sm uppercase tracking-widest transition-all hover:scale-105"
            >
              Applied Jobs
            </p>
            <p
              onClick={() => router.push("/student/saved-jobs")}
              className="hover:text-white cursor-pointer font-bold text-sm uppercase tracking-widest transition-all hover:scale-105"
            >
              Saved Jobs
            </p>
            <div
              onClick={() => setIsProfileDropDownOpen(!isProfileDropDownOpen)}
              className="flex items-center gap-3 hover:bg-white/20 bg-white/10 px-4 py-2 cursor-pointer rounded-full text-white transition-all ring-1 ring-white/20 shadow-sm"
            >
              <Avatar className="w-8 h-8 border border-white/30 shadow-sm">
                <AvatarImage src={userData?.profilePicture || ""} alt="User Avatar" />
                <AvatarFallback className="bg-primary/50 text-white text-xs font-black">
                  {userPlaceholder}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-bold tracking-tight">Profile</span>
            </div>
          </div>
        )}

        {userData?.role === "admin" && (
          <div className="hidden md:flex items-center gap-8 text-white/90">
            <p
              onClick={() => router.push("/admin/Home")}
              className="hover:text-white cursor-pointer font-bold text-sm uppercase tracking-widest transition-all hover:scale-105"
            >
              Dashboard
            </p>
            <p
              onClick={() => router.push("/admin/ManageJobs")}
              className="hover:text-white cursor-pointer font-bold text-sm uppercase tracking-widest transition-all hover:scale-105"
            >
              Manage Jobs
            </p>
            <p
              onClick={() => router.push("/admin/post-job")}
              className="hover:text-white cursor-pointer font-bold text-sm uppercase tracking-widest transition-all hover:scale-105"
            >
              Post Jobs
            </p>
            <div
              onClick={() => setIsProfileDropDownOpen(!isProfileDropDownOpen)}
              className="flex items-center gap-3 hover:bg-white/20 bg-white/10 px-4 py-2 cursor-pointer rounded-full text-white transition-all ring-1 ring-white/20 shadow-sm"
            >
              <Avatar className="w-8 h-8 border border-white/30 shadow-sm">
                <AvatarImage src={userData?.profilePicture || ""} alt="User Avatar" />
                <AvatarFallback className="bg-primary/50 text-white text-xs font-black">
                  {userPlaceholder}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-bold tracking-tight">Profile</span>
            </div>
          </div>
        )}

        {!userData && (
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => router.push("/login")}
              variant="ghost"
              className="text-white hover:bg-white/20 font-bold"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push("/signup")}
              className="bg-white text-primary hover:bg-white/90 font-bold rounded-xl"
            >
              Join Now
            </Button>
          </div>
        )}

        {/* Profile Dropdown */}
        {isProfileDropDownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            ref={dropdownRef}
            className="absolute right-6 top-20 bg-white rounded-2xl shadow-2xl w-64 p-2 z-10 border border-secondary"
          >
            <div className="px-4 py-3 border-b border-secondary mb-1">
              <p className="font-bold text-foreground truncate">
                {userData?.email}
              </p>
              <p className="text-xs text-muted-foreground font-medium truncate">
                {userData?.name}
              </p>
            </div>

            <div
              onClick={() => {
                if (userData?.role === "user") router.push("/student/Profile");
                else if (userData?.role === "admin") router.push("/admin/Profile");
              }}
              className="flex items-center gap-3 text-muted-foreground hover:text-primary hover:bg-primary/5 cursor-pointer px-4 py-2.5 rounded-xl transition-all font-medium"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={userData?.profilePicture || ""} alt="User Avatar" />
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-black">
                  {userPlaceholder}
                </AvatarFallback>
              </Avatar>
              Profile
            </div>

            <div
              onClick={() => {
                if (userData?.role === "user") router.push("/student/settings");
                else if (userData?.role === "admin") router.push("/admin/settings");
              }}
              className="flex items-center gap-3 text-muted-foreground hover:text-primary hover:bg-primary/5 cursor-pointer px-4 py-2.5 rounded-xl transition-all font-medium"
            >
              <Settings className="h-5 w-5" />
              Settings
            </div>

            <div className="pt-1 mt-1 border-t border-secondary">
              <div
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-500 hover:bg-red-50 cursor-pointer px-4 py-2.5 rounded-xl transition-all font-bold"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </div>
          </motion.div>
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
            <p
              onClick={() => {
                if (userData?.role === "user") router.push("/student/Home");
                else if (userData?.role === "admin") router.push("/admin/Home");
                else router.push("/login");
              }}
              className="hover:text-purple-300 cursor-pointer font-semibold"
            >
              Dashboard
            </p>

            {userData?.role === "user" && (
              <>
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
              </>
            )}

            {userData?.role === "admin" && (
              <>
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
              </>
            )}

            <p
              onClick={() => {
                if (userData?.role === "user") router.push("/student/Profile");
                else if (userData?.role === "admin") router.push("/admin/Profile");
              }}
              className="hover:text-purple-300 cursor-pointer font-semibold"
            >
              Profile
            </p>

            {!userData && (
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  onClick={() => router.push("/login")}
                  variant="outline"
                  className="w-full font-bold rounded-xl border-primary text-primary"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/signup")}
                  className="w-full bg-primary text-white font-bold rounded-xl"
                >
                  Join CareerView
                </Button>
              </div>
            )}

            {userData && (
              <div
                onClick={handleLogout}
                className="bg-red-500 w-full p-3 rounded-xl text-center cursor-pointer mt-4"
              >
                <p className="font-semibold text-white flex items-center justify-center gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;