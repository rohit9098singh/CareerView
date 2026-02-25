"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { postFormSchema } from "./validation/PostFormSchema"
import { postJob } from "@/components/services/job.service"
import { toast } from "react-hot-toast"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useState, useRef } from "react"
import {
  Briefcase,
  Building2,
  MapPin,
  Banknote,
  Calendar,
  Sparkles,
  FileText,
  Rocket,
  ShieldCheck,
  ArrowUpRight,
  Upload,
  Camera,
  History,
  LayoutGrid,
  Users
} from "lucide-react"

type PostFormInput = z.infer<typeof postFormSchema>

const PostJobForm = () => {
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [logoError, setLogoError] = useState<string>("");
  const logoInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<PostFormInput>({
    resolver: zodResolver(postFormSchema),
    mode: "onSubmit",
    defaultValues: {
      jobTitle: "",
      companyName: "",
      industryType: "",
      workPlace: "On-site",
      foundedYear: "",
      location: "",
      jobType: "Full-time",
      JobStatus: "active",
      salaryRange: "",
      experienceRequired: "",
      skills: "",
      companySize: "",
      JobDescription: "",
      applicationDeadLine: "",
      companyBenefits: "",
      aboutCompany: "",
    },
  });


  const onSubmit = async (data: PostFormInput) => {
    // Manually validate the logo file since it's outside RHF
    if (!selectedLogo) {
      setLogoError("Company logo is required");
      return;
    }
    if (selectedLogo.size > 5 * 1024 * 1024) {
      setLogoError("Max file size is 5MB");
      return;
    }
    const accepted = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!accepted.includes(selectedLogo.type)) {
      setLogoError("Only .jpg, .jpeg, .png, .webp and .gif formats are supported");
      return;
    }
    setLogoError("");

    const responseData = await postJob({ ...data, logo: selectedLogo });

    if (responseData?.status === "success" || responseData?.data) {
      toast.success("Opportunity broadcasted successfully");
      form.reset();
      setSelectedLogo(null);
      if (logoInputRef.current) logoInputRef.current.value = "";
    } else {
      toast.error(responseData?.message || "Protocol failure: Unable to post job");
    }
  }

  return (
    <div className="mx-auto mt-[80px] max-w-5xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-4">
          <Rocket className="h-3.5 w-3.5" />
          <span>Growth Expansion</span>
        </div>
        <h1 className='text-5xl font-black text-foreground tracking-tight italic mb-2'>Engage Talent</h1>
        <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Define the parameters of your next strategic hire</p>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          {/* Section 1: Role Core */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-primary/5 shadow-2xl rounded-[2.5rem] overflow-hidden bg-background">
              <div className="h-2 bg-primary w-full" />
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-secondary">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-foreground tracking-tight italic">Role Specifications</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Functional Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Lead Architect"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold focus:border-primary/30 transition-all rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Contract Protocol</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10 focus:ring-0 focus:ring-offset-0">
                              <SelectValue placeholder="Full-time" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-primary/10 shadow-2xl">
                              <SelectItem value="Full-time" className="font-bold">Full-time</SelectItem>
                              <SelectItem value="Part-time" className="font-bold">Part-time</SelectItem>
                              <SelectItem value="Contract" className="font-bold">Contract</SelectItem>
                              <SelectItem value="Freelance" className="font-bold">Freelance</SelectItem>
                              <SelectItem value="Internship" className="font-bold">Internship</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="salaryRange"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <Banknote className="h-3 w-3 text-primary" /> Compensation Range
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., ₹12-18 LPA"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experienceRequired"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <Sparkles className="h-3 w-3 text-primary" /> Threshold Expertise
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 3-5 years"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Section 2: Deployment Details */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-primary/5 shadow-2xl rounded-[2.5rem] overflow-hidden bg-background">
              <div className="h-2 bg-secondary w-full" />
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-secondary">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-foreground tracking-tight italic">Deployment Matrix</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="workPlace"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Workplace Hub</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10 focus:ring-0 focus:ring-offset-0">
                              <SelectValue placeholder="Remote" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-primary/10 shadow-2xl">
                              <SelectItem value="On-site" className="font-bold text-foreground">On-site Hub</SelectItem>
                              <SelectItem value="Hybrid" className="font-bold text-foreground">Hybrid Protocol</SelectItem>
                              <SelectItem value="Remote" className="font-bold text-foreground">Remote Global</SelectItem>
                            </SelectContent>
                          </Select>
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
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Primary Node</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., San Francisco, CA"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicationDeadLine"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-primary" /> Integrity Deadline
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="JobStatus"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <ShieldCheck className="h-3 w-3 text-primary" /> Lifecycle Status
                        </FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10 focus:ring-0 focus:ring-offset-0">
                              <SelectValue placeholder="active" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-primary/10 shadow-2xl">
                              <SelectItem value="active" className="font-bold text-green-600">Active Pipeline</SelectItem>
                              <SelectItem value="inActive" className="font-bold text-red-600">Archived Node</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Section 3: Entity Context */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-primary/5 shadow-2xl rounded-[2.5rem] overflow-hidden bg-background">
              <div className="h-2 bg-primary/20 w-full" />
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-secondary">
                  <Building2 className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-foreground tracking-tight italic">Corporate Metadata</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Entity Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Quantum Dynamics"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Logo field managed outside RHF to avoid File object storage issues */}
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Camera className="h-3 w-3 text-primary" /> Visual Identity (Logo)
                    </label>
                    <div className="relative group/file">
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedLogo(file);
                            setLogoError("");
                          }
                        }}
                        className="h-14 w-full rounded-2xl border border-secondary bg-secondary/10 text-sm font-bold cursor-pointer px-4 py-4 file:hidden"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <Upload className="h-5 w-5 text-primary/40 group-hover/file:scale-110 transition-transform" />
                      </div>

                    </div>
                    {logoError && (
                      <p className="text-sm font-medium text-destructive">{logoError}</p>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="industryType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <LayoutGrid className="h-3 w-3 text-primary" /> Economic Sector
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Aerospace Engineering"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <Users className="h-3 w-3 text-primary" /> Demographic Scale
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 500-1000 Analysts"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="foundedYear"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <History className="h-3 w-3 text-primary" /> Origin Year
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 1994"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Section 4: Mission & Directives */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-primary/5 shadow-2xl rounded-[2.5rem] overflow-hidden bg-background">
              <div className="h-2 bg-primary w-full" />
              <CardContent className="p-10">
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-secondary">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-black text-foreground tracking-tight italic">Mission Directives</h2>
                </div>

                <div className="space-y-8">
                  <FormField
                    control={form.control}
                    name="JobDescription"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Functional Directives (Description)</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={6}
                            placeholder="Articulate the strategic imperatives of this role..."
                            {...field}
                            className="border-secondary text-lg font-bold rounded-[2rem] bg-secondary/10 p-8 leading-relaxed italic"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Required Skillsets (CSV)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Quantum Computing, Neural Interfaces, Rust"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aboutCompany"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Entity Vision</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Synthesize the corporate ecosystem..."
                            {...field}
                            className="border-secondary text-lg font-bold rounded-[2rem] bg-secondary/10 p-8 leading-relaxed italic"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyBenefits"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Strategic Incentives</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Equity, Neural Uplink, Teleportation Credit"
                            {...field}
                            className="h-14 border-secondary text-lg font-bold rounded-2xl bg-secondary/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.section>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-between items-center bg-secondary/5 p-8 rounded-[2.5rem] border border-primary/5"
          >
            <div className="hidden sm:block">
              <p className="text-sm font-black text-muted-foreground uppercase tracking-widest italic">Awaiting Protocol Initialization</p>
            </div>
            <Button
              type="submit"
              className="h-16 px-12 rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black italic shadow-2xl shadow-primary/30 transition-all flex items-center gap-3 w-full sm:w-auto text-xl"
            >
              <span>Broadcast Opportunity</span>
              <ArrowUpRight className="h-6 w-6" />
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  )
}

export default PostJobForm
