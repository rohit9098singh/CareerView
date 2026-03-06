"use client"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, FileText, X, User, MapPin, Phone, GraduationCap, Quote, LayoutList, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { personalInfoSchema } from "./validation/personalInfoSchema"
import { z } from "zod"
import { editProfile } from "@/components/services/job.service"
import toast from "react-hot-toast"
import { userProfilePayloadType } from "../../../../../../types/updateProfileResponse"
import { verifyAuth } from "@/components/services/auth.service"

type personalInfoInput = z.infer<typeof personalInfoSchema>

interface PersonalInformationProps {
  // userProfile: userProfilePayloadType | null;
  setUserProfile: React.Dispatch<React.SetStateAction<userProfilePayloadType | null>>;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ setUserProfile }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
      bio: "",
      skills: "",
      studyingAt: "",
      // File inputs should not have default values
      // resumeUrl and profilePicture are excluded
    },
  })
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await verifyAuth();
        console.log("res", response);
        console.log("status", response?.status);
        if (response?.status === "success" && response?.data) {
          const data = response.data;
          setUserProfile(data);
          // File inputs (resumeUrl, profilePicture) excluded from reset
          form.reset({
            name: data.name || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            location: data.location || "",
            bio: data.bio || "",
            skills: Array.isArray(data.skills) ? data.skills.join(", ") : data.skills || "",
            studyingAt: data.studyingAt || "",
          });
        }
      } catch (error: any) {
        toast.error("Failed to load profile data");
      }
    };
    fetchUserProfile();
  }, [form, setUserProfile]);


  const onSubmit = async (data: personalInfoInput) => {
    try {
      console.log("=== SUBMITTING PROFILE UPDATE ===");
      console.log("Form data:", data);
      
      const response: any = await editProfile(data);
      
      console.log("Edit profile response:", response);
      
      if (response.status === "success") {
        toast.success(response?.message || "Profile updated successfully");
        setIsEditMode(false);
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        toast.error(response?.message || "Error updating the profile please try again later");
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Error while Editing");
    }
  }

  const onCancel = () => {
    form.reset()
    setIsEditMode(false)
  }

  return (
    <Card className="border-primary/5 shadow-2xl rounded-[2.5rem] overflow-hidden bg-background">
      <CardContent className="p-8 sm:p-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black text-foreground tracking-tight italic mb-2">Personal Dossier</h2>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Update your operative details</p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            {!isEditMode ? (
              <Button
                variant="outline"
                onClick={() => setIsEditMode(true)}
                className="h-12 px-8 font-black rounded-2xl border-secondary hover:bg-secondary/20 transition-all gap-2 w-full sm:w-auto"
              >
                <Pencil className="h-4 w-4" />
                <span>Modify Metadata</span>
              </Button>
            ) : (
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="h-12 px-6 font-black rounded-2xl border-secondary hover:bg-secondary/20 transition-all gap-2 flex-1 sm:flex-none"
                >
                  <X className="h-4 w-4" />
                  <span>Abort</span>
                </Button>
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  className="h-12 px-8 font-black rounded-2xl shadow-lg shadow-primary/20 transition-all gap-2 flex-1 sm:flex-none"
                >
                  <FileText className="h-4 w-4" />
                  <span>Sync Profile</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        <Form {...form}>
          <form className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <User className="h-3 w-3 text-primary" /> Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditMode}
                        className="h-14 border-secondary text-lg font-bold focus:border-primary/30 transition-all rounded-2xl bg-secondary/10 disabled:bg-secondary/20 disabled:opacity-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-3 opacity-60">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Contact Node</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/40 border-dashed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Phone className="h-3 w-3 text-primary" /> Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditMode}
                        className="h-14 border-secondary text-lg font-bold focus:border-primary/30 transition-all rounded-2xl bg-secondary/10 disabled:bg-secondary/20 disabled:opacity-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-primary" /> Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditMode}
                        className="h-14 border-secondary text-lg font-bold focus:border-primary/30 transition-all rounded-2xl bg-secondary/10 disabled:bg-secondary/20 disabled:opacity-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 py-8 border-y border-secondary">
              <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Primary Resume (PDF)</FormLabel>
                    <FormControl>
                      <div className="relative group/file">
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => onChange(e.target.files)}
                          disabled={!isEditMode}
                          className="h-32 border-2 border-dashed border-secondary hover:border-primary/30 transition-all rounded-[2rem] bg-secondary/10 file:hidden cursor-pointer"
                          {...field}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <LayoutList className="h-8 w-8 text-primary/40 mb-2 group-hover/file:scale-110 transition-transform" />
                          <span className="text-sm font-black text-foreground italic">Click to Upload</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Avatar Update</FormLabel>
                    <FormControl>
                      <div className="relative group/file">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => onChange(e.target.files)}
                          disabled={!isEditMode}
                          className="h-32 border-2 border-dashed border-secondary hover:border-primary/30 transition-all rounded-[2rem] bg-secondary/10 file:hidden cursor-pointer"
                          {...field}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <User className="h-8 w-8 text-primary/40 mb-2 group-hover/file:scale-110 transition-transform" />
                          <span className="text-sm font-black text-foreground italic">Select Portrait</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-8">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Quote className="h-3 w-3 text-primary" /> The Mission (Bio)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        {...field}
                        disabled={!isEditMode}
                        className="border-secondary text-lg font-bold focus:border-primary/30 transition-all rounded-[2rem] bg-secondary/10 disabled:bg-secondary/20 disabled:opacity-100 p-8 leading-relaxed italic"
                        placeholder="Tell us about your professional journey..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-primary" /> Arsenal (Skills)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditMode}
                          className="h-14 border-secondary text-lg font-bold focus:border-primary/30 transition-all rounded-2xl bg-secondary/10 disabled:bg-secondary/20 disabled:opacity-100"
                          placeholder="Java, Python, Next.js..."
                        />
                      </FormControl>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-2 px-2">Comma-separated skills</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studyingAt"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <GraduationCap className="h-3 w-3 text-primary" /> Academy
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditMode}
                          className="h-14 border-secondary text-lg font-bold focus:border-primary/30 transition-all rounded-2xl bg-secondary/10 disabled:bg-secondary/20 disabled:opacity-100"
                          placeholder="Your University or Institution"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PersonalInformation
