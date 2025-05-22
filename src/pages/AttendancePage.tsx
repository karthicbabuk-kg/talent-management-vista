
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Mock attendance data
const attendanceData = [
  { date: new Date(2025, 4, 5), status: 'present' },
  { date: new Date(2025, 4, 6), status: 'present' },
  { date: new Date(2025, 4, 7), status: 'present' },
  { date: new Date(2025, 4, 8), status: 'late' },
  { date: new Date(2025, 4, 9), status: 'present' },
  { date: new Date(2025, 4, 12), status: 'present' },
  { date: new Date(2025, 4, 13), status: 'absent' },
  { date: new Date(2025, 4, 14), status: 'present' },
  { date: new Date(2025, 4, 15), status: 'present' },
  { date: new Date(2025, 4, 16), status: 'present' },
  { date: new Date(2025, 4, 19), status: 'present' },
  { date: new Date(2025, 4, 20), status: 'present' },
  { date: new Date(2025, 4, 21), status: 'late' },
];

// Mock employees for manual attendance entry
const employees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Sarah Johnson' },
  { id: 3, name: 'Michael Brown' },
  { id: 4, name: 'Lisa Clark' },
  { id: 5, name: 'Robert Taylor' },
];

const AttendancePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [clockedIn, setClockedIn] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  // Handle clock in
  const handleClockIn = () => {
    setClockedIn(true);
    toast.success('Clocked In Successfully', {
      description: `You clocked in at ${new Date().toLocaleTimeString()}`,
    });
  };

  // Handle clock out
  const handleClockOut = () => {
    setClockedIn(false);
    toast.success('Clocked Out Successfully', {
      description: `You clocked out at ${new Date().toLocaleTimeString()}`,
    });
  };

  // Handle manual attendance submission
  const handleManualAttendance = () => {
    if (!selectedEmployee || !selectedStatus) {
      toast.error('Error', {
        description: 'Please select both employee and status',
      });
      return;
    }

    toast.success('Attendance Recorded', {
      description: `${selectedEmployee}'s attendance marked as ${selectedStatus}`,
    });

    // Reset selections
    setSelectedEmployee('');
    setSelectedStatus('');
  };

  // Custom day rendering for the calendar
  const dayClassName = (date: Date) => {
    const attendanceEntry = attendanceData.find(
      (entry) => entry.date.toDateString() === date.toDateString()
    );

    if (!attendanceEntry) return '';

    return cn(
      'relative',
      attendanceEntry.status === 'present' && 'bg-green-100 text-green-800',
      attendanceEntry.status === 'absent' && 'bg-red-100 text-red-800',
      attendanceEntry.status === 'late' && 'bg-yellow-100 text-yellow-800'
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance</h1>
        <p className="text-muted-foreground">Track and manage employee attendance.</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clock">Clock In/Out</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>

        {/* Attendance Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Calendar</CardTitle>
                  <CardDescription>View your monthly attendance record</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                    classNames={{
                      day_selected: "bg-primary text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day: (date) => dayClassName(date),
                    }}
                  />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      <span className="text-sm">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-red-500"></div>
                      <span className="text-sm">Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Late</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                      <span className="text-sm">Weekend</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Holiday</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                  <CardDescription>May 2025</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Working Days</span>
                    <span className="font-medium">22</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Present</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Absent</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Late</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">On Leave</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Holidays</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Weekends</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Attendance Rate</span>
                      <Badge variant="default">91%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Clock In/Out Tab */}
        <TabsContent value="clock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clock In / Clock Out</CardTitle>
              <CardDescription>
                Record your daily attendance by clocking in and out.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold">{new Date().toLocaleDateString()}</h3>
                <p className="text-4xl font-bold mt-4" id="currentTime">
                  {new Date().toLocaleTimeString()}
                </p>
                <p className="text-muted-foreground mt-2">Current Time</p>
              </div>

              <div className="flex justify-center gap-4 w-full max-w-sm">
                <Button
                  size="lg"
                  className="w-full"
                  disabled={clockedIn}
                  onClick={handleClockIn}
                >
                  Clock In
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  disabled={!clockedIn}
                  onClick={handleClockOut}
                >
                  Clock Out
                </Button>
              </div>

              <div className="bg-muted p-6 rounded-lg w-full max-w-sm">
                <h4 className="font-medium mb-4">Today's Status</h4>
                {clockedIn ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Clock In Time</span>
                      <span className="text-sm font-medium">{new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge variant="default">Present</Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    You haven't clocked in yet today.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manual Attendance Entry Tab */}
        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Attendance Entry</CardTitle>
              <CardDescription>Add or update attendance records manually.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Select Date</label>
                  <div className="mt-1">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="border rounded-md"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Employee</label>
                    <Select
                      value={selectedEmployee}
                      onValueChange={setSelectedEmployee}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.name}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Attendance Status</label>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="half-day">Half Day</SelectItem>
                        <SelectItem value="leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleManualAttendance}>Save Attendance</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendancePage;
