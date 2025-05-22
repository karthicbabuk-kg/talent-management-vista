
import React from 'react';
import EmployeeTable from '@/components/employees/EmployeeTable';

const EmployeesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Employees</h1>
        <p className="text-muted-foreground">View, manage and add employees to your organization.</p>
      </div>
      
      <EmployeeTable />
    </div>
  );
};

export default EmployeesPage;
