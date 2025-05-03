"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const mockApplicants = [
  {
    name: "John Doe",
    email: "john@example.com",
    studentId: "S12345",
    appliedDate: "04/10/2025",
    status: "Pending"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    studentId: "S54321",
    appliedDate: "04/11/2025",
    status: "Reviewed"
  }
];

export default function AppliedUsers({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className=" overflow-hidden p-6  ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Applied Users</DialogTitle>
        </DialogHeader>

        <div className="overflow-auto rounded-md border border-gray-200 h-[67vh]  max-w-6xl scrollbar-hide">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[140px]">Student ID</TableHead>
                <TableHead className="w-[160px]">Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApplicants.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.studentId}</TableCell>
                  <TableCell>{user.appliedDate}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                        <Eye/>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
