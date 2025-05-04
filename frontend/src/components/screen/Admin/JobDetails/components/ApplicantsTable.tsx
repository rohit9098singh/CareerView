"use client";

import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye, Users, View } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import {
  getAllAppliedJobs,
    getApplicationsByJobId,
    getRecommendedJobs,
    updateApplicationStatus,
} from "@/components/services/job.service";
import { Application } from "../../../../../../types/allApplicantsData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";

const ApplicantsTable: React.FC = () => {
    const [applicants, setApplicants] = useState<Application[]>([]);
    const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();
    const jobId = params.id;

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await getApplicationsByJobId(jobId);
                if (response?.status === "success") {
                    setApplicants(response.data);
                }
            } catch (error) {
                console.log("Error fetching applicants");
            }
        };
        fetchApplicants();
    }, [jobId]);

    const handleStatusChange = async (newStatus: string, applicantId: string) => {
        try {
            const response = await updateApplicationStatus(jobId, {
                status: newStatus,
                applicantId,
            });
            console.log("Status updated:", response?.status);
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const handleProfileClick = (applicant: Application) => {
        setSelectedApplicant(applicant);
        setIsModalOpen(true);
    };
    console.log("legts see the applicants", applicants)

    return (
        <div className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        All Applicants ({applicants.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Applied Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicants.length > 0 ? (
                                applicants.map((app) => (
                                    <TableRow key={app._id}>
                                        <TableCell className="font-medium">
                                            {app.applicantId?.name}
                                        </TableCell>
                                        <TableCell>{app.applicantId?.email}</TableCell>
                                        <TableCell>
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                defaultValue={app.status}
                                                onValueChange={(value) =>
                                                    handleStatusChange(value, app.applicantId?.id)
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select job status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="accepted">Accepted</SelectItem>
                                                    <SelectItem value="rejected">Rejected</SelectItem>
                                                    <SelectItem value="interview-schedule">
                                                        Interview Schedule
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Button
                                                    onClick={() => handleProfileClick(app)}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500">
                                        No applicants applied yet
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            {isModalOpen && selectedApplicant && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md border border-gray-200 relative">
      <h2 className="text-xl font-bold text-center text-indigo-700 mb-6 tracking-wide">
        Applicant Profile
      </h2>

      {selectedApplicant.applicantId && (
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 shadow-md ring-2 ring-indigo-500 mb-4">
            <AvatarImage
              src={selectedApplicant.applicantId.profilePicture as string}
              alt={selectedApplicant.applicantId.name || "Profile"}
            />
            <AvatarFallback>
              {selectedApplicant.applicantId.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold text-gray-800">
            {selectedApplicant.applicantId.name}
          </h3>
          <p className="text-sm text-gray-500">
            {selectedApplicant.applicantId.email}
          </p>
        </div>
      )}

      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Email:</span>
          <span>{selectedApplicant.applicantId?.email}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Phone:</span>
          <span>{selectedApplicant.applicantId?.phoneNumber || "N/A"}</span>
        </div>
        {selectedApplicant.applicantId?.resumeUrl && (
          <div className="flex flex-col space-y-2 pt-4">
            <span className="font-medium text-gray-600">Resume:</span>
            <div className="flex gap-4 items-center">
              <a
                href={selectedApplicant.applicantId.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:underline text-sm"
              >
                <Eye/> Preview
              </a>
              <a
                href={selectedApplicant.applicantId.resumeUrl}
                download
                className="text-green-600 hover:underline text-sm"
              >
                <Download/> Download
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setIsModalOpen(false)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Close
        </Button>
      </div>
    </div>
  </div>
)}



        </div>
    );
};

export default ApplicantsTable;
