import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, UserPlus, Edit, Search, Users, Phone, Calendar, MapPin } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const PatientManagement = () => {
  const { currentUser, getAllUsers } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);

  // Mock patient data - in real app this would come from the user context
  const patients = [
    {
      id: 'p1',
      name: 'Bella Cortinas',
      role: 'Patient',
      serial: 'MM84346',
      registered: '12/15/2023',
      caregiverRole: 'Primary Caregiver',
      phone: '(123) 456-7890'
    },
    {
      id: 'p2', 
      name: 'Jane Doe',
      role: 'Patient',
      serial: 'MM85026',
      registered: '11/24/2023',
      caregiverRole: 'Caregiver',
      phone: '(123) 456-7890'
    }
  ];

  const caregivers = [
    {
      id: 'c1',
      name: 'Brandon Hidalgo',
      role: 'Primary Caregiver'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Patient Management</CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="patients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg rounded-xl p-1">
          <TabsTrigger 
            value="patients" 
            className="data-[state=active]:bg-teal-500 data-[state=active]:text-white font-semibold py-3 rounded-lg"
          >
            <User className="w-4 h-4 mr-2" />
            Patients
          </TabsTrigger>
          <TabsTrigger 
            value="people" 
            className="data-[state=active]:bg-teal-500 data-[state=active]:text-white font-semibold py-3 rounded-lg"
          >
            <Users className="w-4 h-4 mr-2" />
            People
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 border-gray-200 rounded-xl"
            />
          </div>

          {/* Patient Cards */}
          <div className="space-y-4">
            {patients.map((patient) => (
              <Card key={patient.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Serial:</span> {patient.serial}
                          </div>
                          <div>
                            <span className="font-medium">Registered:</span> {patient.registered}
                          </div>
                          <div>
                            <span className="font-medium">Role:</span> {patient.caregiverRole}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1 text-orange-500" />
                            <span className="text-orange-500 font-medium">{patient.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-teal-600 border-teal-600 hover:bg-teal-50">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Patient Button */}
          <Button 
            onClick={() => setShowAddPatient(true)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl text-lg font-semibold"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            ADD PATIENT
          </Button>
        </TabsContent>

        <TabsContent value="people" className="space-y-6">
          {/* Current Patient */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Patient</h3>
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Bella Cortinas</h4>
                      <p className="text-gray-600">Role: Patient</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-teal-600 border-teal-600">
                    EDIT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Caregivers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Caregivers</h3>
            <div className="space-y-4">
              {caregivers.map((caregiver) => (
                <Card key={caregiver.id} className="bg-white border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <UserPlus className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{caregiver.name}</h4>
                          <p className="text-gray-600">Role: {caregiver.role}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                          SELF CARE
                        </Button>
                        <Button variant="outline" size="sm" className="text-teal-600 border-teal-600">
                          EDIT
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold">
                ADD EXISTING USER
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold">
                ADD NEW CAREGIVER
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientManagement;