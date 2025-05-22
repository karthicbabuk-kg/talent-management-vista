import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentUpload from '@/components/documents/DocumentUpload';
import DocumentList from '@/components/documents/DocumentList';

const DocumentManagement = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Document Management</h1>
      
      <Tabs defaultValue="upload" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          <TabsTrigger value="list">Document List</TabsTrigger>
        </TabsList>
        
        <Card className="mt-4 p-4">
          <TabsContent value="upload">
            <DocumentUpload />
          </TabsContent>
          
          <TabsContent value="list">
            <DocumentList />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default DocumentManagement; 