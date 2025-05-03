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
import { Pencil, FileText, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { personalInfoSchema } from "./validation/personalInfoSchema"
import { z } from "zod"
import { editProfile } from "@/components/services/job.service"
import toast from "react-hot-toast"
import { UserProfileApiResponse, userProfilePayloadType } from "../../../../../../types/updateProfileResponse"
import { verifyAuth } from "@/components/services/auth.service"

type personalInfoInput = z.infer<typeof personalInfoSchema>

interface PersonalInformationProps {
  userProfile: userProfilePayloadType | null;
  setUserProfile: React.Dispatch<React.SetStateAction<userProfilePayloadType | null>>;
}

const PersonalInformation:React.FC<PersonalInformationProps> = ({ userProfile, setUserProfile }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
      bio: "",
      skills: [""],
      studyingAt: "",
      resumeUrl: "",
      profilePicture: ""
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
          // form.reset(data);
          form.reset({
            name: data.name || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            location: data.location || "",
            bio: data.bio || "",
            skills: data.skills || [""],
            studyingAt: data.studyingAt || "",
            resumeUrl: data.resumeUrl || "",
            profilePicture: data.profilePicture || ""
          });
        }
      } catch (error) {
        toast.error("Failed to load profile data");
      }
    };
    fetchUserProfile();
  }, [form, setUserProfile]);
  

  const onSubmit = async (data: personalInfoInput) => {
    console.log(data.skills)
    try {
      setLoading(true);
      const response: any = await editProfile(data);
      if (response.status === "success") {
        toast.success("profile updated successfuly");
        form.reset();
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      }
      else {
        toast.error("Error updating the profile please try again later")
      }
    } catch (error: any) {
      toast.error(error.message || "Error while Editing")
    } finally {
      setLoading(false)
    }
  }

  const onCancel = () => {
    form.reset()
    setIsEditMode(false)
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p className="text-sm text-gray-500">Update your personal details</p>
          </div>

          {!isEditMode ? (
            <Button variant="outline" onClick={() => setIsEditMode(true)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)}>
                <FileText className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </div>

        <Form {...form}>
          <form>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditMode} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="mt-2 flex gap-4 w-full">
                <FormField
                  control={form.control}
                  name="resumeUrl"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Resume (PDF only)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => field.onChange(e.target.files)}

                          disabled={!isEditMode}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Profile Picture (Image files only)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files)}
                          disabled={!isEditMode}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditMode} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditMode} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} disabled={!isEditMode} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditMode}
                        placeholder="Enter skills separated by commas"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="studyingAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Studying At</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditMode} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PersonalInformation
