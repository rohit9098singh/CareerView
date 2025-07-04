"use client";

import { Button } from "@/components/ui/button";
import { jobDataPayloadType } from "../../../../../../types/fetchJobResponse";

interface JobDeleteDialogProps {
  job: jobDataPayloadType;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function JobDeleteDialog({ job, onCancel, onConfirm }: JobDeleteDialogProps) {
  console.log("from",job)
  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-center">Confirm Deletion</h2>
        <p className="text-gray-600 text-center">
          Are you sure you want to delete the job <span className="font-semibold">{job.jobTitle}</span>?
        </p>
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
