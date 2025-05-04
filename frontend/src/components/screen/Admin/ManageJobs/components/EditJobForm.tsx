'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { editFormSchema } from './validation/validation';
import { Textarea } from '@/components/ui/textarea';
import { editJob } from '@/components/services/job.service';

type EditFormType = z.infer<typeof editFormSchema>;

interface EditJobFormProps {
  jobData: EditFormType;
}

const EditJobForm: React.FC<EditJobFormProps> = ({ jobData }) => {

  console.log(jobData)

  console.log("first",jobData)
  const form = useForm<EditFormType>({
    resolver: zodResolver(editFormSchema),
    defaultValues: jobData,
  });

  const onSubmit =async (data: EditFormType) => {
    console.log('Updated job data:', data);
    try {
         const response=await editJob(data);
         console.log("hello eorld")
         if(response.status=== "success"){
          toast.success("job updated successfully !");
          setTimeout(()=>{
             window.location.reload();
          },1000)
         }
         else{
          console.log("something went wrong while editing",response?.error)
         }
    } catch (error:any) {
        toast.error("something went wrong",error.message)
    }
  };

  return (
    <div className=" px-4 py-8 overflow-y-scroll">
      <h1 className="text-3xl font-bold">Edit Job</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4 ">
          <div className="grid grid-cols-1 gap-6">
            <FormField control={form.control} name="jobTitle" render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., google" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>
                    Upload Logo <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null
                        onChange(file)
                      }}
                      {...fieldProps}
                      className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 
                                  file:cursor-pointer hover:file:bg-gray-100"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField
              control={form.control}
              name="companySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company Size <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 50-200 employees" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Industry Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., IT Services" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workPlace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Workplace Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Remote" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="On-site">On-site</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foundedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Founded Year <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2012" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Location <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Bangalore" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Job Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="JobStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Job Status <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select defaultValue={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Active" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inActive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salaryRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Salary Range <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ₹4-8 LPA" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceRequired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Experience Required <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2+ years" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Skills <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Node.js" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicationDeadLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Application Deadline <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Enter the deadline date" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="JobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Job Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the job" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aboutCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Company <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write about the company..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyBenefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Benefits</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter company benefits separated by commas (e.g., Health Insurance, Paid Leaves)"
                      {...field}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        field.onChange(inputValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />
          </div>

          <div className=" mt-6 ">
            <Button type="submit" className='w-full'>Edit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditJobForm;
