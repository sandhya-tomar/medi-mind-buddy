import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit3, Trash2, Save, X, Pill } from 'lucide-react';
import { useUser, Medication } from '@/contexts/UserContext';

const MedicationManager = () => {
  const { medications, addMedication, updateMedication, deleteMedication } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Medication>>({});

  const medicationTypes = ['Heart', 'Diabetes', 'Blood Pressure', 'Pain', 'Mental Health', 'Vitamin', 'Other'];

  const handleInputChange = (field: keyof Medication, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setFormData({
      name: '',
      dosage: '',
      frequency: '',
      time: '',
      type: '',
      notes: ''
    });
  };

  const handleEdit = (medication: Medication) => {
    setEditingId(medication.id);
    setFormData(medication);
  };

  const handleSave = () => {
    if (!formData.name || !formData.dosage || !formData.frequency || !formData.time || !formData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (isAdding) {
      addMedication(formData as Omit<Medication, 'id' | 'taken'>);
      toast({
        title: "Medication Added! 💊",
        description: `${formData.name} has been added to your medication list.`,
      });
      setIsAdding(false);
    } else if (editingId) {
      updateMedication(editingId, formData);
      toast({
        title: "Medication Updated! ✅",
        description: `${formData.name} has been updated successfully.`,
      });
      setEditingId(null);
    }

    setFormData({});
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string, name: string) => {
    deleteMedication(id);
    toast({
      title: "Medication Removed",
      description: `${name} has been removed from your medication list.`,
    });
  };

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Heart': 'bg-red-100 text-red-800',
      'Diabetes': 'bg-blue-100 text-blue-800',
      'Blood Pressure': 'bg-green-100 text-green-800',
      'Pain': 'bg-yellow-100 text-yellow-800',
      'Mental Health': 'bg-purple-100 text-purple-800',
      'Vitamin': 'bg-orange-100 text-orange-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Pill className="w-6 h-6 text-green-600" />
              <span>Medication Management</span>
            </div>
            <Button
              onClick={handleAddNew}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(isAdding || editingId) && (
            <Card className="bg-white border-2 border-blue-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="medName">Medication Name *</Label>
                    <Input
                      id="medName"
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter medication name"
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage *</Label>
                    <Input
                      id="dosage"
                      value={formData.dosage || ''}
                      onChange={(e) => handleInputChange('dosage', e.target.value)}
                      placeholder="e.g., 75mg, 2 tablets"
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency *</Label>
                    <Select value={formData.frequency || ''} onValueChange={(value) => handleInputChange('frequency', value)}>
                      <SelectTrigger className="border-blue-200 focus:border-blue-400">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Once daily">Once daily</SelectItem>
                        <SelectItem value="Twice daily">Twice daily</SelectItem>
                        <SelectItem value="Three times daily">Three times daily</SelectItem>
                        <SelectItem value="Four times daily">Four times daily</SelectItem>
                        <SelectItem value="As needed">As needed</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time || ''}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Select value={formData.type || ''} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger className="border-blue-200 focus:border-blue-400">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {medicationTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input
                      id="notes"
                      value={formData.notes || ''}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Additional notes (optional)"
                      className="border-blue-200 focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {medications.map((medication) => (
              <Card key={medication.id} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{medication.name}</h3>
                        <Badge className={getTypeColor(medication.type)}>
                          {medication.type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                        <span><strong>Dosage:</strong> {medication.dosage}</span>
                        <span><strong>Frequency:</strong> {medication.frequency}</span>
                        <span><strong>Time:</strong> {medication.time}</span>
                        <span><strong>Notes:</strong> {medication.notes || 'None'}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(medication)}
                        size="sm"
                        variant="outline"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(medication.id, medication.name)}
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationManager;
