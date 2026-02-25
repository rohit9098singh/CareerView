import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getStudentApplicationStats } from '@/components/services/job.service';

const ApplicationStats = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStudentApplicationStats();
      if (data?.data) {
        setStats(data.data);
      }
    };

    fetchStats();
  }, []);

  const statsArray = Object.entries(stats).map(([name, count]) => ({ name, count }));

  return (
    <Card className="overflow-hidden border-primary/5 shadow-md">
      <CardHeader className="bg-secondary/30 pb-4">
        <CardTitle className="text-lg font-bold tracking-tight">Application Stats</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-5">
          {statsArray.map((stat) => (
            <div key={stat.name} className="flex items-center justify-between group">
              <div className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors capitalize">
                  {stat.name.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md text-sm">
                {stat.count}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationStats;
