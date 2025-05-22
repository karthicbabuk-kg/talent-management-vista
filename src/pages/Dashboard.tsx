
import React from 'react';
import { Users, Clock, Calendar, FileText } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import DepartmentDistribution from '@/components/dashboard/DepartmentDistribution';
import RecentActivity from '@/components/dashboard/RecentActivity';
import LeaveRequests from '@/components/dashboard/LeaveRequests';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, admin. Here's an overview of your HR data.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Employees" 
          value="58" 
          icon={<Users className="h-5 w-5 text-primary" />} 
          change={{ value: "+3 this month", positive: true }} 
        />
        <StatCard 
          title="Present Today" 
          value="48" 
          icon={<Clock className="h-5 w-5 text-primary" />} 
          change={{ value: "82% attendance", positive: true }} 
        />
        <StatCard 
          title="Leave Requests" 
          value="5" 
          icon={<Calendar className="h-5 w-5 text-primary" />} 
          change={{ value: "3 pending approval", positive: true }} 
        />
        <StatCard 
          title="Documents" 
          value="125" 
          icon={<FileText className="h-5 w-5 text-primary" />} 
          change={{ value: "10 need review", positive: false }} 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <DepartmentDistribution />
      </div>

      {/* Activity and Leave Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <LeaveRequests />
      </div>
    </div>
  );
};

export default Dashboard;
