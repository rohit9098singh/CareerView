"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {  CircleCheckBig, CircleX, Clock, FileTextIcon, FileWarning } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { appliedApplicants } from "./data/data"
import { useState } from "react"

const statusOptions = ["pending", "reviewing", "accepted", "rejected"]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-gray-100 text-gray-800"
    case "reviewing":
      return "bg-purple-100 text-purple-800"
    case "accepted":
      return "bg-green-100 text-green-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-2 w-2 rounded-full text-yellow-500 mr-2" />
    case "reviewing":
      return <FileWarning  className="h-2 w-2 rounded-full text-purple-500 mr-2" />
    case "accepted":
      return <CircleCheckBig className="h-2 w-2 rounded-full text-green-500 mr-2" />
    case "rejected":
      return <CircleX className="h-2 w-2 rounded-full text-red-500 mr-2" />
    default:
      return null
  }
}

const Applicant = () => {
  const [jobFilter, setJobFilter] = useState("all")

  const filteredApplicants =
    jobFilter === "all"
      ? appliedApplicants
      : appliedApplicants.filter((applicant) => applicant.job === jobFilter)

  return (
    <div className="container mx-auto p-6 max-w-7xl mt-[64px]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Applicant Management</h1>
        <Select defaultValue="all" onValueChange={(value) => setJobFilter(value)}>
          <SelectTrigger className="w-[220px] border-gray-300">
            <SelectValue placeholder="All Jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
            <SelectItem value="UX/UI Designer">UX/UI Designer</SelectItem>
            <SelectItem value="Data Science Intern">Data Science Intern</SelectItem>
            <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
            <SelectItem value="Marketing Assistant">Marketing Assistant</SelectItem>
            <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
            <SelectItem value="Product Manager">Product Manager</SelectItem>
            <SelectItem value="Content Writer">Content Writer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="py-4 font-medium text-gray-700">Applicant</TableHead>
              <TableHead className="py-4 font-medium text-gray-700">Job</TableHead>
              <TableHead className="py-4 font-medium text-gray-700">Applied Date</TableHead>
              <TableHead className="py-4 font-medium text-gray-700">Status</TableHead>
              <TableHead className="py-4 font-medium text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((applicant) => (
              <TableRow key={applicant.id} className="border-t border-gray-200">
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{applicant.name}</span>
                    <span className="text-sm text-gray-500">{applicant.email}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-gray-700">{applicant.job}</TableCell>
                <TableCell className="py-4 text-gray-700">{applicant.date}</TableCell>
                <TableCell className="py-4">
                  <Badge className={cn("font-normal capitalize", getStatusColor(applicant.status))}>
                    {applicant.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FileTextIcon className="h-4 w-4" />
                      View CV
                    </Button>
                    <Select defaultValue={applicant.status}>
                      <SelectTrigger className="w-[130px] border-gray-300">
                        <div className="flex items-center">
                          {getStatusIcon(applicant.status)}
                          <span className="capitalize">{applicant.status}</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status} className="capitalize">
                            <div className="flex items-center">
                              {getStatusIcon(status)}
                              {status}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Applicant
