
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock leave request data
const leaveRequests = [
  {
    id: 1,
    employee: 'John Doe',
    department: 'Engineering',
    type: 'Casual Leave',
    from: '2025-05-25',
    to: '2025-05-27',
    status: 'pending'
  },
  {
    id: 2,
    employee: 'Sarah Johnson',
    department: 'Marketing',
    type: 'Sick Leave',
    from: '2025-05-24',
    to: '2025-05-24',
    status: 'pending'
  },
  {
    id: 3,
    employee: 'Michael Brown',
    department: 'Finance',
    type: 'Personal Leave',
    from: '2025-05-30',
    to: '2025-06-02',
    status: 'pending'
  }
];

const LeaveRequests = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Pending Leave Requests</CardTitle>
        <Button size="sm" variant="outline">View All</Button>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div>
                      <p className="font-medium">{request.employee}</p>
                      <p className="text-xs text-muted-foreground">{request.department}</p>
                    </div>
                  </td>
                  <td>{request.type}</td>
                  <td>{request.from}</td>
                  <td>{request.to}</td>
                  <td>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      Pending
                    </Badge>
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="default" className="h-8">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveRequests;
