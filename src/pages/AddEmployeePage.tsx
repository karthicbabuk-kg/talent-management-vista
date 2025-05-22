
import React from 'react';
import EmployeeForm from '@/components/employees/EmployeeForm';

const AddEmployeePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Employee</h1>
        <p className="text-muted-foreground">Create a new employee record with all details.</p>
      </div>
      
      <EmployeeForm />
    </div>
  );
};

export default AddEmployeePage;
