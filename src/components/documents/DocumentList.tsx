import { useState } from 'react';
import { FileText, Download, Trash2, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';

interface Document {
  id: string;
  fileName: string;
  documentType: string;
  employeeName: string;
  uploadDate: string;
  fileSize: string;
}

const DocumentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  // Sample data (replace with actual data from your API)
  const documents: Document[] = [
    {
      id: '1',
      fileName: 'aadhar_card.pdf',
      documentType: 'Aadhar Card',
      employeeName: 'John Doe',
      uploadDate: '2024-03-20',
      fileSize: '2.5 MB'
    },
    {
      id: '2',
      fileName: 'pan_card.jpg',
      documentType: 'PAN Card',
      employeeName: 'Jane Smith',
      uploadDate: '2024-03-19',
      fileSize: '1.2 MB'
    },
    // Add more sample documents
  ];

  const documentTypes = [
    'All Types',
    'Aadhar Card',
    'PAN Card',
    'Bank Passbook',
    'Passport',
    'Driver License',
    'Other'
  ];

  const employees = [
    { id: 'all', name: 'All Employees' },
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    // Add more employees
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || selectedType === 'All Types' || doc.documentType === selectedType;
    const matchesEmployee = !selectedEmployee || selectedEmployee === 'all' || doc.employeeName === employees.find(e => e.id === selectedEmployee)?.name;

    return matchesSearch && matchesType && matchesEmployee;
  });

  const handleDownload = async (documentId: string, fileName: string) => {
    try {
      // Replace with your actual download API endpoint
      const response = await fetch(`/api/documents/download/${documentId}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      toast.error('Failed to download document', {
        description: 'Please try again later'
      });
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      // Replace with your actual delete API endpoint
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Document deleted successfully');
        // Refresh document list
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      toast.error('Failed to delete document', {
        description: 'Please try again later'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Employees" />
            </SelectTrigger>
            <SelectContent>
              {employees.map(employee => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDocuments.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>{doc.fileName}</span>
                </div>
              </TableCell>
              <TableCell>{doc.documentType}</TableCell>
              <TableCell>{doc.employeeName}</TableCell>
              <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
              <TableCell>{doc.fileSize}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(doc.id, doc.fileName)}
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(doc.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {filteredDocuments.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No documents found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentList; 