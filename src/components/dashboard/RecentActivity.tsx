
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

// Mock activity data
const activities = [
  {
    id: 1,
    type: 'leave',
    message: 'John Doe applied for casual leave',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'document',
    message: 'Sarah Johnson uploaded new documents',
    time: '3 hours ago'
  },
  {
    id: 3,
    type: 'employee',
    message: 'New employee Michael Brown onboarded',
    time: '5 hours ago'
  },
  {
    id: 4,
    type: 'attendance',
    message: 'Lisa Clark marked late attendance',
    time: 'Yesterday'
  },
  {
    id: 5,
    type: 'leave',
    message: 'Robert Taylor's leave request approved',
    time: 'Yesterday'
  }
];

// Activity badge types
const badgeVariants = {
  leave: { variant: "secondary", label: "Leave" },
  document: { variant: "outline", label: "Document" },
  employee: { variant: "default", label: "Employee" },
  attendance: { variant: "destructive", label: "Attendance" },
};

const RecentActivity = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <ul className="space-y-4">
          {activities.map((activity) => {
            const badgeType = badgeVariants[activity.type as keyof typeof badgeVariants];
            
            return (
              <li key={activity.id} className="flex items-start px-6 py-2 hover:bg-muted/50">
                <Badge 
                  variant={badgeType.variant as "default" | "secondary" | "destructive" | "outline"}
                  className="mr-3 mt-1"
                >
                  {badgeType.label}
                </Badge>
                <div>
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
