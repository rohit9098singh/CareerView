import { Card, CardContent } from '@/components/ui/card';
import { FileText, User, CheckCircle, Clock } from 'lucide-react';
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
      icon: <FileText className="h-5 w-5 text-primary" />,
    },
    {
      id: 2,
      title: 'Active Jobs',
      value: stats.activeJobs,
      description: 'Currently active postings',
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    },
    {
      id: 3,
      title: 'Total Applicants',
      value: stats.totalApplicants,
      description: 'Across all postings',
      icon: <User className="h-5 w-5 text-blue-500" />,
    },
    {
      id: 4,
      title: 'Pending Review',
      value: stats.pendingReview,
      description: 'Applications to review',
      icon: <Clock className="h-5 w-5 text-amber-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-foreground italic">System Overview</h2>
        <div className="h-px bg-secondary flex-grow mx-4 hidden sm:block" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <Card key={stat.id} className="border-primary/5 shadow-md hover:shadow-lg transition-all group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">{stat.title}</p>
                  <p className="text-4xl font-black text-foreground">{stat.value}</p>
                  <p className="text-[10px] font-bold text-muted-foreground/60">{stat.description}</p>
                </div>
                <div className="bg-secondary/50 p-3 rounded-2xl group-hover:bg-primary/10 transition-colors">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
