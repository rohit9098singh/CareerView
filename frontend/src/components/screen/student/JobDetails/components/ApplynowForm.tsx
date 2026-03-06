"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ApplynowFormSchema } from "./validation/ApplynowFormSchema";
import toast from "react-hot-toast";
import { applyJob } from "@/components/services/job.service";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Send, FileUp } from "lucide-react";

type ApplyInput = z.infer<typeof ApplynowFormSchema>;

const ApplynowForm = () => {
    const params = useParams();
    const jobId = params.id as string;

    const [loading, setLoading] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string>("");

    const form = useForm<ApplyInput>({
        resolver: zodResolver(ApplynowFormSchema),
        mode: "onChange",
        defaultValues: {
            resume: undefined,
            coverLetter: "",
        },
    });

    const onSubmit = async (data: ApplyInput) => {
        if (!data.resume || data.resume.length === 0) {
            toast.error("Please upload your resume");
            return;
        }

        try {
            console.log("=== SUBMITTING JOB APPLICATION ===");
            console.log("Job ID:", jobId);
            console.log("Application data:", data);
            console.log("Resume file:", data.resume);
            
            setLoading(true);
            const response = await applyJob(jobId, data);
            
            console.log("Apply job response:", response);
            
            if (response.status === "success") {
                toast.success(response?.message || "Job applied successfully! Good luck.");
                form.reset();
            } else {
                toast.error(response.message || "Failed to apply");
            }
        } catch (error: any) {
            console.error("Job application error:", error);
            toast.error(error.message || "Error while applying");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8 p-8"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-foreground italic tracking-tight flex items-center gap-3">
                        <Sparkles className="h-8 w-8 text-primary" />
                        Complete Your Pitch
                    </h1>
                    <p className="text-muted-foreground font-medium mt-1">Show them why you&apos;re the perfect fit.</p>
                </div>
            </div>

            <hr className="border-secondary" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="resume"
                        render={({ field: { onChange, value, ...field } }) => (
                            <FormItem className="space-y-4">
                                <FormLabel className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <FileUp className="h-4 w-4 text-primary" />
                                    Resume (PDF Required)
                                </FormLabel>
                                <FormControl>
                                    <div className="relative group">
                                        <Input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => {
                                                const files = e.target.files;
                                                if (files && files.length > 0) {
                                                    onChange(files);
                                                    setSelectedFileName(files[0].name);
                                                    // Clear any validation errors
                                                    form.clearErrors("resume");
                                                }
                                            }}
                                            className="h-14 py-4 px-6 border-2 border-dashed border-secondary hover:border-primary/50 transition-all rounded-2xl cursor-pointer file:bg-primary file:text-white file:rounded-lg file:font-black file:uppercase file:text-[10px] file:mr-4 file:px-4"
                                            {...field}
                                        />
                                        {selectedFileName && (
                                            <p className="mt-2 text-sm text-green-600 font-medium flex items-center gap-2">
                                                ✓ {selectedFileName}
                                            </p>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="coverLetter"
                        render={({ field }) => (
                            <FormItem className="space-y-4">
                                <FormLabel className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                                    Your Narrative (Cover Letter)
                                </FormLabel>
                                <FormControl>
                                    <textarea
                                        placeholder="Pitch yourself! Why should they pick you?"
                                        className="w-full h-48 p-6 text-lg font-medium border-2 border-secondary focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all outline-none rounded-3xl bg-secondary/5 resize-none placeholder:text-muted-foreground/40"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full h-16 text-xl font-black rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-3"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-6 w-6 animate-spin" />
                                <span>Securing Role...</span>
                            </>
                        ) : (
                            <>
                                <Send className="h-6 w-6" />
                                <span>Submit Application</span>
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </motion.div>
    );
};

export default ApplynowForm;
