import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import DepartmentManagement from '@/components/organization/DepartmentManagement';
import DesignationManagement from '@/components/organization/DesignationManagement';
import OrganizationHierarchy from '@/components/organization/OrganizationHierarchy';

const OrganizationStructure = () => {
  const [activeTab, setActiveTab] = useState("departments");

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Organization Structure</h1>
      
      <Tabs defaultValue="departments" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="designations">Designations</TabsTrigger>
          <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
        </TabsList>
        
        <Card className="mt-4 p-4">
          <TabsContent value="departments">
            <DepartmentManagement />
          </TabsContent>
          
          <TabsContent value="designations">
            <DesignationManagement />
          </TabsContent>
          
          <TabsContent value="hierarchy">
            <OrganizationHierarchy />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default OrganizationStructure; 