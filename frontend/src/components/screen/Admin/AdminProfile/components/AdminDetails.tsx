"use client"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, X, FileText, User, MapPin, Phone, ShieldAlert, Quote, LayoutList, Camera } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { adminProfileValidation } from "./validation/adminProfileValidation"
import { userProfilePayloadType } from "../../../../../../types/updateProfileResponse"
import { editAdminProfile } from "@/components/services/job.service"
import toast from "react-hot-toast"

type adminInfoType = z.infer<typeof adminProfileValidation>;

interface PersonalInformationProps {
  adminProfile: userProfilePayloadType | null;
}

export const AdminDetails: React.FC<PersonalInformationProps> = ({ adminProfile }) => {
  const [isEditMode, setIsEditMode] = useState(false);

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
    }
  };


  const onCancel = () => {
    form.reset();
    setIsEditMode(false);
  };

  return (
    <Card className="border-primary/5 shadow-2xl rounded-[2.5rem] overflow-hidden bg-background">
      <CardContent className="p-8 sm:p-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-black text-foreground tracking-tight italic mb-2">Authority Metadata</h2>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Synchronize your credential details</p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            {!isEditMode ? (
              <Button
                variant="outline"
                onClick={() => setIsEditMode(true)}
                className="h-12 px-8 font-black rounded-2xl border-secondary hover:bg-secondary/20 transition-all gap-2 w-full sm:w-auto"
              >
                <Pencil className="h-4 w-4" />
                <span>Override Profile</span>
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
                  <span>Commit Changes</span>
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
                      <User className="h-3 w-3 text-primary" /> Authority Name
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
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <ShieldAlert className="h-3 w-3 text-primary" /> Primary Endpoint
                    </FormLabel>
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
                      <Phone className="h-3 w-3 text-primary" /> Direct Protocol (Phone)
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
                      <MapPin className="h-3 w-3 text-primary" /> Authority Node
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

            <div className="py-8 border-y border-secondary">
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Admin Portrait Update</FormLabel>
                    <FormControl>
                      <div className="relative group/file">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          disabled={!isEditMode}
                          className="h-32 border-2 border-dashed border-secondary hover:border-primary/30 transition-all rounded-[2rem] bg-secondary/10 file:hidden cursor-pointer"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <Camera className="h-8 w-8 text-primary/40 mb-2 group-hover/file:scale-110 transition-transform" />
                          <span className="text-sm font-black text-foreground italic">Update Security Thumbnail</span>
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
                      <Quote className="h-3 w-3 text-primary" /> Authority Directive (Bio)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        {...field}
                        disabled={!isEditMode}
                        className="border-secondary text-lg font-bold focus:border-primary/30 transition-all rounded-[2rem] bg-secondary/10 disabled:bg-secondary/20 disabled:opacity-100 p-8 leading-relaxed italic"
                        placeholder="Define your administrative focus..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
