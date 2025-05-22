
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

// Mock leave data
const leaveRequests = [
  {
    id: 1,
    type: 'Casual Leave',
    from: '2025-06-10',
    to: '2025-06-12',
    reason: 'Personal work',
    status: 'approved',
  },
  {
    id: 2,
    type: 'Sick Leave',
    from: '2025-05-05',
    to: '2025-05-07',
    reason: 'Fever and cold',
    status: 'approved',
  },
  {
    id: 3,
    type: 'Personal Leave',
    from: '2025-05-30',
    to: '2025-06-02',
    reason: 'Family function',
    status: 'pending',
  },
];

// Leave balance data
const leaveBalance = [
  { type: 'Casual Leave', total: 12, used: 4, remaining: 8 },
  { type: 'Sick Leave', total: 10, used: 2, remaining: 8 },
  { type: 'Personal Leave', total: 5, used: 1, remaining: 4 },
  { type: 'Vacation', total: 15, used: 0, remaining: 15 },
];

// Leave application schema
const leaveApplicationSchema = z.object({
  leaveType: z.string().min(1, { message: 'Please select leave type' }),
  reason: z.string().min(5, { message: 'Please provide a reason with at least 5 characters' }),
});

type LeaveApplicationValues = z.infer<typeof leaveApplicationSchema>;

const LeavePage = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Initialize the form
  const form = useForm<LeaveApplicationValues>({
    resolver: zodResolver(leaveApplicationSchema),
    defaultValues: {
      leaveType: '',
      reason: '',
    },
  });

  // Form submission handler
  const onSubmit = (data: LeaveApplicationValues) => {
    if (!dateRange.from || !dateRange.to) {
      toast.error('Error', {
        description: 'Please select leave start and end dates',
      });
      return;
    }

    console.log({
      ...data,
      fromDate: dateRange.from,
      toDate: dateRange.to,
    });

    toast.success('Leave Application Submitted', {
      description: 'Your leave request has been sent for approval.',
    });

    // Reset form
    form.reset();
    setDateRange({ from: undefined, to: undefined });
  };

  // Calculate days between two dates
  const getDays = (from: Date, to: Date) => {
    const difference = to.getTime() - from.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24)) + 1;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <p className="text-muted-foreground">Apply for leave and track your leave balance.</p>
      </div>

      <Tabs defaultValue="apply" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="apply">Apply Leave</TabsTrigger>
          <TabsTrigger value="history">Leave History</TabsTrigger>
          <TabsTrigger value="balance">Leave Balance</TabsTrigger>
        </TabsList>

        {/* Apply Leave Tab */}
        <TabsContent value="apply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Application</CardTitle>
              <CardDescription>Submit a new leave request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">Select Leave Dates</h3>
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    className="rounded-md border"
                  />
                </div>

                <div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="leaveType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Leave Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select leave type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="casual">Casual Leave</SelectItem>
                                <SelectItem value="sick">Sick Leave</SelectItem>
                                <SelectItem value="personal">Personal Leave</SelectItem>
                                <SelectItem value="vacation">Vacation</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Leave</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide details about your leave request"
                                className="resize-none"
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Leave Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">From</span>
                            <span className="text-sm font-medium">
                              {dateRange.from ? dateRange.from.toLocaleDateString() : 'Not selected'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">To</span>
                            <span className="text-sm font-medium">
                              {dateRange.to ? dateRange.to.toLocaleDateString() : 'Not selected'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Days</span>
                            <span className="text-sm font-medium">
                              {dateRange.from && dateRange.to
                                ? getDays(dateRange.from, dateRange.to)
                                : '0'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Submit Leave Request
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Leave History</CardTitle>
              <CardDescription>View your leave applications and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full data-table">
                  <thead>
                    <tr>
                      <th>Leave Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Days</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.type}</td>
                        <td>{new Date(leave.from).toLocaleDateString()}</td>
                        <td>{new Date(leave.to).toLocaleDateString()}</td>
                        <td>
                          {getDays(new Date(leave.from), new Date(leave.to))}
                        </td>
                        <td>{leave.reason}</td>
                        <td>
                          <Badge
                            variant={
                              leave.status === 'approved'
                                ? 'default'
                                : leave.status === 'rejected'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave Balance Tab */}
        <TabsContent value="balance">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balance</CardTitle>
              <CardDescription>Track your available leave balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full data-table">
                  <thead>
                    <tr>
                      <th>Leave Type</th>
                      <th>Total</th>
                      <th>Used</th>
                      <th>Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveBalance.map((balance, index) => (
                      <tr key={index}>
                        <td>{balance.type}</td>
                        <td>{balance.total}</td>
                        <td>{balance.used}</td>
                        <td>
                          <Badge
                            variant={
                              balance.remaining > balance.total / 2
                                ? 'default'
                                : balance.remaining > 0
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {balance.remaining}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-md">
                <h4 className="text-sm font-medium mb-2">Leave Year</h4>
                <p className="text-sm">January 2025 - December 2025</p>
                <div className="mt-4">
                  <div className="text-sm font-medium">Note:</div>
                  <ul className="list-disc list-inside text-sm pl-2">
                    <li>Leaves are credited at the beginning of the year.</li>
                    <li>Unused leaves may be carried forward based on company policy.</li>
                    <li>
                      Contact HR for any discrepancies in leave balance or special leave requests.
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeavePage;
