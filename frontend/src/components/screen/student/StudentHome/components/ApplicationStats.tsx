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
    <Card>
      <CardHeader>
        <CardTitle>Application Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {statsArray.map((stat) => (
            <div key={stat.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <span>{stat.name}</span>
              </div>
              <span className="font-medium text-purple-600">{stat.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationStats;
