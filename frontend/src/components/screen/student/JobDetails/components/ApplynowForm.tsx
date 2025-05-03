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

type ApplyInput = z.infer<typeof ApplynowFormSchema>;

const ApplynowForm = () => {

    const params=useParams();
    const jobId=params.id;

    const [loading, setLoading] = useState(false)
    const form = useForm<ApplyInput>({
        resolver: zodResolver(ApplynowFormSchema),
        defaultValues: {
            resume: undefined,
            coverLetter: "",
        },
    });

    const onSubmit = async (data: ApplyInput) => {
        try {
            setLoading(true);
            const response = await applyJob(jobId, data); 
            if (response.status === "success") {
                toast.success("Job applied successfully");
                form.reset();
            } else {
                toast.error("Something went wrong");
            }
        } catch (error: any) {
            toast.error(error.message || "Error while applying");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-lg ml-4 font-bold">Apply Now</h1>
            <hr />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 p-6 max-w-xl mx-auto"
                >
                    <FormField
                        control={form.control}
                        name="resume"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resume (PDF only)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => field.onChange(e.target.files)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="coverLetter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <span className="font-semibold">
                                        Cover Letter (required)
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <textarea
                                        placeholder="Write your cover letter here..."
                                        className="w-full p-2 border rounded"
                                        rows={5}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Applying..." : "Apply Now"}
                    </Button>

                </form>
            </Form>
        </div>
    );
};

export default ApplynowForm;
