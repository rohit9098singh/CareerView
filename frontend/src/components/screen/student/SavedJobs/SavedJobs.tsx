"use client";

import React, { useEffect, useState } from "react";
import {
    BookmarkCheck,
    Building2,
    DollarSign,
    ExternalLink,
    MapPin,
    Trash2,
    Clock,
    Search,
    ChevronRight,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllSavedJobs, saveUnsaveJob } from "@/components/services/job.service";
import { motion, AnimatePresence } from "framer-motion";

type SavedJobType = {
    _id: string;
    jobTitle: string;
    companyName: string;
    location: string;
    jobType: string;
    salaryRange: string;
    JobDescription: string;
    createdAt: string;
    skills: [string]
};

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState<SavedJobType[]>([]);
    // const [error, setError] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [jobToDelete, setJobToDelete] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await getAllSavedJobs();
            if (response.status === "success") {
                setSavedJobs(response.data);
            } else {
                console.error("Failed to fetch jobs.");
            }
        } catch (err: any) {
            // setError(err.message);
            console.log(err.message)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async () => {
        if (jobToDelete) {
            try {
                await saveUnsaveJob(jobToDelete);
                setSavedJobs((prev) => prev.filter((job) => job._id !== jobToDelete));
                setShowDeleteModal(false);
                setJobToDelete(null);
            } catch (err: any) {
                console.error("Unsave failed", err.message);
            }
        }
    };

    return (
        <div className="mx-auto mt-[80px] max-w-5xl px-4 py-12">
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-4">
                    <BookmarkCheck className="h-3 w-3" />
                    <span>Your Collection</span>
                </div>
                <h1 className='text-5xl font-black text-foreground mb-4 tracking-tight italic'>Saved Opportunities</h1>
                <p className='text-muted-foreground text-lg font-medium max-w-2xl'>
                    Keep track of the roles that spark your interest and apply when you&apos;re ready to make your move.
                </p>
            </div>

            <div className='bg-background p-2 rounded-[2.5rem] shadow-2xl border border-primary/5'>
                <div className="p-8">
                    {savedJobs.length > 0 ? (
                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {savedJobs.map((job) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={job._id}
                                        className="group relative bg-secondary/10 hover:bg-background border border-secondary hover:border-primary/20 p-8 rounded-[2rem] transition-all duration-300 hover:shadow-xl overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                                            <div className="flex flex-col sm:flex-row items-start gap-6 flex-1">
                                                <Avatar className="w-16 h-16 border-4 border-background shadow-md group-hover:scale-105 transition-transform">
                                                    <AvatarFallback className="bg-primary/10 text-primary font-black text-2xl uppercase">
                                                        {job.companyName.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="space-y-3">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <span className="text-xs font-black text-primary uppercase tracking-widest">{job.companyName}</span>
                                                        <div className="flex items-center gap-2 text-muted-foreground/60 text-xs font-bold">
                                                            <Clock className="h-3 w-3" />
                                                            <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-foreground tracking-tight italic leading-tight group-hover:text-primary transition-colors">
                                                        {job.jobTitle}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-bold text-sm">
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="h-4 w-4 text-primary/40" />
                                                            <span>{job.location}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <DollarSign className="h-4 w-4 text-primary/40" />
                                                            <span className="text-foreground">{job.salaryRange} LPA</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Briefcase className="h-4 w-4 text-primary/40" />
                                                            <span>{job.jobType}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 self-end lg:self-center">
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => {
                                                        setJobToDelete(job._id);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="h-12 w-12 rounded-2xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>

                                                <Button
                                                    asChild
                                                    className="h-12 px-8 font-black rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all group/btn"
                                                >
                                                    <Link href={`/student/JobDetails/${job._id}`}>
                                                        <span>View Details</span>
                                                        <ChevronRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 px-4"
                        >
                            <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border-2 border-primary/5">
                                <BookmarkCheck className="h-12 w-12 text-primary/20" />
                            </div>
                            <h3 className="text-3xl font-black text-foreground tracking-tight italic mb-3">Your list is empty</h3>
                            <p className="text-muted-foreground font-medium max-w-xs mx-auto mb-10 leading-relaxed">
                                You haven&apos;t saved any roles yet. Explore the marketplace to find your next move.
                            </p>
                            <Button
                                asChild
                                size="lg"
                                className="h-14 px-10 font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                            >
                                <Link href="/student/FindJob">
                                    <Search className="mr-2 h-5 w-5" />
                                    Explore Careers
                                </Link>
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-background rounded-[2.5rem] border border-primary/10 p-10 shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-destructive/20" />
                            <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center text-destructive mb-6">
                                <Trash2 className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground tracking-tight italic mb-3">Remove from Saved?</h3>
                            <p className="text-muted-foreground font-medium leading-relaxed mb-8">
                                This will remove the opportunity from your collection. You can always save it again later.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className="h-12 font-black rounded-2xl border-secondary hover:bg-secondary/20"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Keep It
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    className="h-12 font-black rounded-2xl shadow-lg shadow-destructive/20"
                                >
                                    Yes, Remove
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SavedJobs;
