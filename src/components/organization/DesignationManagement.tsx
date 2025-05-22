import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';

interface Designation {
  id: string;
  title: string;
  department: string;
  level: string;
  description: string;
}

const DesignationManagement = () => {
  const [designations, setDesignations] = useState<Designation[]>([
    {
      id: '1',
      title: 'HR Manager',
      department: 'Human Resources',
      level: 'Manager',
      description: 'Manages HR operations and team'
    },
    // Add more sample designations as needed
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState<Designation | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    level: '',
    description: ''
  });

  const levels = [
    'Entry Level',
    'Associate',
    'Senior',
    'Lead',
    'Manager',
    'Director',
    'Executive'
  ];

  const departments = [
    'Human Resources',
    'Information Technology',
    'Finance',
    'Marketing',
    'Operations'
  ];

  const handleAddEdit = (designation?: Designation) => {
    if (designation) {
      setEditingDesignation(designation);
      setFormData({
        title: designation.title,
        department: designation.department,
        level: designation.level,
        description: designation.description
      });
    } else {
      setEditingDesignation(null);
      setFormData({
        title: '',
        department: '',
        level: '',
        description: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDesignation) {
      // Update existing designation
      setDesignations(designations.map(desig =>
        desig.id === editingDesignation.id
          ? { ...desig, ...formData }
          : desig
      ));
    } else {
      // Add new designation
      setDesignations([...designations, {
        id: Date.now().toString(),
        ...formData
      }]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setDesignations(designations.filter(desig => desig.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Designation Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleAddEdit()}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Designation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingDesignation ? 'Edit Designation' : 'Add New Designation'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => setFormData({ ...formData, level: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingDesignation ? 'Update' : 'Create'} Designation
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {designations.map((designation) => (
            <TableRow key={designation.id}>
              <TableCell>{designation.title}</TableCell>
              <TableCell>{designation.department}</TableCell>
              <TableCell>{designation.level}</TableCell>
              <TableCell>{designation.description}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleAddEdit(designation)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(designation.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DesignationManagement; 