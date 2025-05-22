import { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

interface FileWithPreview extends File {
  preview?: string;
}

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample employee data (replace with actual data from your system)
  const employees = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    // Add more employees
  ];

  const documentTypes = [
    'Aadhar Card',
    'PAN Card',
    'Bank Passbook',
    'Passport',
    'Driver License',
    'Other'
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValid = validateFile(file);
      if (!isValid) {
        toast.error(`Invalid file: ${file.name}`, {
          description: 'Only PDF and image files (JPG, JPEG, PNG) are allowed. Maximum size: 5MB'
        });
      }
      return isValid;
    });

    setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!selectedEmployee) {
      toast.error('Please select an employee');
      return;
    }

    if (!documentType) {
      toast.error('Please select a document type');
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file');
      return;
    }

    const formData = new FormData();
    formData.append('employeeId', selectedEmployee);
    formData.append('documentType', documentType);
    selectedFiles.forEach(file => {
      formData.append('documents', file);
    });

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Documents uploaded successfully');
        setSelectedFiles([]);
        setDocumentType('');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast.error('Failed to upload documents', {
        description: 'Please try again later'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="employee">Select Employee</Label>
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger>
              <SelectValue placeholder="Select an employee" />
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

        <div>
          <Label htmlFor="documentType">Document Type</Label>
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="files">Upload Files</Label>
          <div className="flex items-center gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              id="files"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              multiple
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Files
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Supported formats: PDF, JPG, PNG (Max size: 5MB)
          </p>
        </div>

        {selectedFiles.length > 0 && (
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Selected Files:</h3>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-muted p-2 rounded"
                >
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || !selectedEmployee || !documentType}
          className="w-full"
        >
          Upload Documents
        </Button>
      </div>
    </div>
  );
};

export default DocumentUpload; 