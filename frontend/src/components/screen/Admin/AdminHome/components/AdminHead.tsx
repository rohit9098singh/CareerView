import React from 'react';
import { Button } from '@/components/ui/button';
import { BriefcaseBusiness, Plus } from 'lucide-react';
import Link from 'next/link';

interface UserDetailsProps {
  user: string;
}

const AdminHead: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div className='bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg border border-primary/10 mb-6'>
      <div className='flex flex-col gap-6'>
        <h1 className='text-3xl font-extrabold tracking-tight italic'>Welcome, Admin {user}!</h1>
        <p className='text-primary-foreground/80 text-lg font-medium max-w-2xl'>
          Manage job postings and applications with ease from your central admin dashboard.
        </p>
        <div className='flex flex-wrap gap-4 mt-2'>
          <Link href='/admin/ManageJobs'>
            <Button variant="secondary" className='flex items-center gap-2 font-bold px-6'>
              <BriefcaseBusiness className="w-4 h-4" />
              <span>Manage Jobs</span>
            </Button>
          </Link>
          <Link href='/admin/post-job'>
            <Button variant="outline" className='flex items-center gap-2 text-white border-white/30 bg-white/10 hover:bg-white/20 font-bold px-6'>
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
