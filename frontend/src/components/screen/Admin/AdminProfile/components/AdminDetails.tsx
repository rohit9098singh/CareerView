"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, X, FileText } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { adminProfileValidation } from "./validation/adminProfileValidation";
import { userProfilePayloadType } from "../../../../../../types/updateProfileResponse";
import { editAdminProfile } from "@/components/services/job.service";
import toast from "react-hot-toast";

type adminInfoType = z.infer<typeof adminProfileValidation>;

interface PersonalInformationProps {
  adminProfile: userProfilePayloadType ;
  // setAdminProfile: React.Dispatch<React.SetStateAction<userProfilePayloadType | null >>;
}

export const AdminDetails: React.FC<PersonalInformationProps> = ({ adminProfile }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  // const [loading, setLoading] = useState(false);


  const form = useForm({
    resolver: zodResolver(adminProfileValidation),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      location: "",
      bio: "",
      profilePicture: "",
    },
  });

  console.log(" latin name of the user is the ",adminProfile?.phoneNumber)

  useEffect(() => {
    if (adminProfile) {
      form.reset({
        name: adminProfile?.name || "",
        email: adminProfile?.email || "",
        phoneNumber: adminProfile?.phoneNumber || "",
        location: adminProfile?.location || "",
        bio: adminProfile?.bio || "",
        profilePicture: "",
      });
    }
  }, [adminProfile, form]);

  const onSubmit = async (data: adminInfoType) => {
    try {
      // setLoading(true);
      const response: any = await editAdminProfile(data);
      if (response.status === "success") {
        toast.success("Profile updated successfully");
        form.reset();
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      } else {
        toast.error("Error updating the profile. Please try again later.");
      }
    } catch (error: any) {
      toast.error(error.message || "Error while editing");
    } finally {
      // setLoading(false);
    }
  };


  const onCancel = () => {
    form.reset();
    setIsEditMode(false);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Admin Information</h2>
            <p className="text-sm text-gray-500">View and update admin details</p>
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
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditMode} />
                  </FormControl>
                  <FormMessage />
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
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      disabled={!isEditMode}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[100px] resize-none"
                      disabled={!isEditMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
