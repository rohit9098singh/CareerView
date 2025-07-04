"use client";

import React, { useEffect, useState } from "react";
import {
    BookmarkCheck,
    Building,
    DollarSign,
    ExternalLink,
    MapPin,
    Trash2,
    Clock,
} from "lucide-react";
import Link from "next/link";
import { getAllSavedJobs, saveUnsaveJob } from "@/components/services/job.service";

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
        <div className="w-full max-w-7xl mx-auto p-4 pt-[88px]">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <BookmarkCheck className="h-5 w-5 text-purple-700" />
                        <h2 className="text-xl font-semibold">Saved Jobs</h2>
                    </div>
                </div>

                {savedJobs.length > 0 ? (
                    <div className="space-y-4">
                        {savedJobs.map((job) => (
                            <div
                                key={job._id}
                                className="relative border rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 bg-purple-100 rounded-md flex items-center justify-center text-purple-700 font-bold">
                                        {job.companyName.charAt(0)}
                                    </div>
                                    <div>

                                    </div>
                                    <div className="flex-1 ">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-lg">{job.jobTitle}</h3>
                                            <div className="flex items-center gap-2 mt-2 text-sm text-slate-900">
                                                <Clock className="h-4 w-4" />
                                                <span>Posted on : {""}{new Date(job.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Building className="h-4 w-4" />
                                            <span>{job.companyName}</span>
                                            <span className="mx-1">•</span>
                                            <MapPin className="h-4 w-4" />
                                            <span>{job.location}</span>
                                            <DollarSign className="h-4 w-4" />
                                            <span>{job.salaryRange} LPA</span>
                                        </div>
                                        <div className="text-sm text-purple-700 bg-purple-50 p-2 mt-2 rounded-md line-clamp-3">
                                            {job.JobDescription}
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {job.skills && job?.skills[0]?.split(',').map((skill: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                                                >
                                                    {skill.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 mt-4">

                                    <button
                                        onClick={() => {
                                            setJobToDelete(job._id);
                                            setShowDeleteModal(true);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors text-sm font-medium cursor-pointer"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span>Unsave</span>
                                    </button>

                                    <Link
                                        href={`/student/JobDetails/${job._id}`}
                                        className="px-6 py-2.5 rounded-md bg-purple-500/40 text-purple-700 hover:bg-purple-200 text-sm font-medium cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <ExternalLink className="h-4 w-4" />
                                            <span>View Details</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <BookmarkCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-700">No saved jobs yet</h3>
                        <p className="text-gray-500 mt-1">Jobs you save will appear here</p>
                        <Link
                            href="/student/FindJob"
                            className="mt-4 inline-flex items-center px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
                        >
                            Browse Jobs
                        </Link>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4">Remove Job</h3>
                        <p className="text-gray-600">Are you sure you want to remove this job from saved?</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
