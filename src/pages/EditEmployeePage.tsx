
import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeForm from '@/components/employees/EmployeeForm';

const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for this example
  // In a real app, you would fetch the employee data based on the ID
  const mockEmployeeData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "1234567890",
    dateOfBirth: "1990-01-01",
    gender: "male",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    employeeId: `EMP-${id}`,
    joinDate: "2022-01-15",
    department: "engineering",
    designation: "Software Engineer",
    reportingManager: "Jane Smith",
    employmentType: "full-time",
    bankName: "ABC Bank",
    accountNumber: "123456789",
    ifscCode: "ABC0001234",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Employee</h1>
        <p className="text-muted-foreground">Update employee information for ID: {id}</p>
      </div>
      
      <EmployeeForm initialData={mockEmployeeData} isEditing={true} />
    </div>
  );
};

export default EditEmployeePage;
