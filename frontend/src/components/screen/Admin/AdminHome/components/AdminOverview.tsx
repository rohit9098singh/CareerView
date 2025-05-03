import { Card, CardContent } from '@/components/ui/card';
import { FileText, User } from 'lucide-react';
import React from 'react';

type AdminStatsProps = {
  stats: {
    totalJobs: number;
    activeJobs: number;
    totalApplicants: number;
    pendingReview: number;
  };
};

const AdminOverview: React.FC<AdminStatsProps> = ({ stats }) => {
  const statsData = [
    {
      id: 1,
      title: 'Total Jobs',
      value: stats.totalJobs,
      description: 'All job postings',
      icon: <FileText className="h-5 w-5 text-gray-600" />,
    },
    {
      id: 2,
      title: 'Active Jobs',
      value: stats.activeJobs,
      description: 'Currently active postings',
      icon: <FileText className="h-5 w-5 text-gray-600" />,
    },
    {
      id: 3,
      title: 'Total Applicants',
      value: stats.totalApplicants,
      description: 'Across all job postings',
      icon: <User className="h-5 w-5 text-gray-600" />,
    },
    {
      id: 4,
      title: 'Pending Review',
      value: stats.pendingReview,
      description: 'Applications needing review',
      icon: <FileText className="h-5 w-5 text-gray-600" />,
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <Card key={stat.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
