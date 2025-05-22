
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis
} from "recharts";

// Mock attendance data
const attendanceData = [
  {
    name: 'Mon',
    present: 45,
    absent: 5,
    late: 3,
  },
  {
    name: 'Tue',
    present: 48,
    absent: 2,
    late: 3,
  },
  {
    name: 'Wed',
    present: 46,
    absent: 3,
    late: 4,
  },
  {
    name: 'Thu',
    present: 44,
    absent: 6,
    late: 3,
  },
  {
    name: 'Fri',
    present: 47,
    absent: 2,
    late: 4,
  },
  {
    name: 'Sat',
    present: 25,
    absent: 1,
    late: 2,
  },
  {
    name: 'Sun',
    present: 0,
    absent: 0,
    late: 0,
  }
];

const AttendanceChart = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weekly Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="absent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="late" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
