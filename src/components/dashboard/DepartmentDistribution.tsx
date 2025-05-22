
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Mock department data
const departmentData = [
  { name: 'Engineering', value: 20, color: 'hsl(var(--primary))' },
  { name: 'Marketing', value: 15, color: 'hsl(var(--secondary))' },
  { name: 'Finance', value: 10, color: 'hsl(var(--accent-foreground))' },
  { name: 'HR', value: 5, color: 'hsl(var(--destructive))' },
  { name: 'Operations', value: 8, color: 'hsl(var(--ring))' },
];

const DepartmentDistribution = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Department Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DepartmentDistribution;
