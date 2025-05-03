import React from 'react';
import { Button } from '@/components/ui/button';
import { BriefcaseBusiness, Plus } from 'lucide-react';
import Link from 'next/link';

interface UserDetailsProps {
  user: string;
}

const AdminHead: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div className='bg-blue-500 p-6 rounded-2xl text-white shadow-md'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Welcome, Admin {user}!</h1>
        <p className='text-sm'>
          Manage job postings and applications from your admin dashboard.
        </p>
        <div className='flex gap-3'>
        <Link href='/admin/ManageJobs'>
            <Button variant="secondary" className='flex items-center gap-1 hover:'>
              <BriefcaseBusiness className="w-4 h-4 text-blue-400 hover:text-blue-500" />
              <span className='text-blue-400 hover:text-blue-500'>Manage Jobs</span>
            </Button>
          </Link>
          <Link href='/admin/post-job'>
            <Button variant="ghost" className='flex items-center gap-1 text-white border-2 border-white'>
              <Plus className="w-4 h-4" />
              <span>Post New Job</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHead;
