import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserProfile, useUser } from '@/contexts/UserContext';
import { Brain, Heart, User, Users, ArrowRight, Sparkles, UserPlus, UserCheck } from 'lucide-react';

const WelcomeScreen = () => {
  const { createNewUser, getAllUsers, switchUser } = useUser();
  const [step, setStep] = useState<'welcome' | 'role-selection' | 'patient-form' | 'caregiver-form'>('welcome');
  const [userRole, setUserRole] = useState<'patient' | 'caregiver' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    emergencyContact: '',
    medicalConditions: '',
    allergies: '',
    doctorName: '',
    doctorPhone: '',
    healthStreak: 0,
    totalMedications: 0,
    completedToday: 0,
    healthScore: 100
  });

  const existingUsers = getAllUsers();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateUser = () => {
    if (!formData.name || !formData.age) {
      return;
    }

    const userWithRole = {
      ...formData,
      role: userRole || 'patient'
    };

    createNewUser(userWithRole as Omit<UserProfile, 'id' | 'createdAt' | 'lastActive'>);
  };

  const handleRoleSelection = (role: 'patient' | 'caregiver') => {
    setUserRole(role);
    setStep(role === 'patient' ? 'patient-form' : 'caregiver-form');
  };

  const handleSelectUser = (userId: string) => {
    switchUser(userId);
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-teal-400 to-cyan-500 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-3 mb-8">
              <Brain className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">MedMinder</h1>
          </div>

          {/* Registration Steps */}
          <div className="bg-teal-600 rounded-t-3xl p-6 text-white">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-medium">REGISTER</span>
              <span className="text-sm font-medium">WHO ARE YOU?</span>
              <span className="text-sm font-medium">ABOUT YOU</span>
            </div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-teal-800 font-bold">01</div>
              <div className="flex-1 h-1 bg-teal-500 mx-2"></div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">02</div>
              <div className="flex-1 h-1 bg-teal-500 mx-2"></div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-teal-600 font-bold">03</div>
            </div>

            <Button
              onClick={() => setStep('role-selection')}
              className="w-full bg-white text-teal-600 hover:bg-gray-100 font-semibold py-4 rounded-xl text-lg"
            >
              Get Started
            </Button>
          </div>

          {/* Existing Users */}
          {existingUsers.length > 0 && (
            <div className="bg-white rounded-b-3xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Continue Your Journey</h3>
              <div className="space-y-2">
                {existingUsers.slice(0, 2).map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleSelectUser(user.id)}
                    className="w-full p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.age} years old</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'role-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-teal-400 to-cyan-500 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Brain className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-2">MedMinder</h1>
          </div>

          {/* Steps Progress */}
          <div className="bg-teal-600 rounded-t-3xl p-6 text-white">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-medium">REGISTER</span>
              <span className="text-sm font-medium">WHO ARE YOU?</span>
              <span className="text-sm font-medium">ABOUT YOU</span>
            </div>
            
            <div className="flex items-center justify-between mb-8">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-teal-800 font-bold">01</div>
              <div className="flex-1 h-1 bg-orange-500 mx-2"></div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">02</div>
              <div className="flex-1 h-1 bg-teal-500 mx-2"></div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-teal-600 font-bold">03</div>
            </div>

            {/* Role Selection Cards */}
            <div className="space-y-4">
              <Card 
                className="bg-white p-6 cursor-pointer hover:shadow-lg transition-shadow border-0"
                onClick={() => handleRoleSelection('patient')}
              >
                <div className="text-center">
                  <User className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800">Patient</h3>
                </div>
              </Card>

              <Card 
                className="bg-white p-6 cursor-pointer hover:shadow-lg transition-shadow border-0"
                onClick={() => handleRoleSelection('caregiver')}
              >
                <div className="text-center">
                  <UserPlus className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800">Caregiver</h3>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-teal-400 to-cyan-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Brain className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">MedMinder</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">REGISTER</span>
              <span className="text-sm font-medium text-gray-600">WHO ARE YOU?</span>
              <span className="text-sm font-medium text-teal-600">ABOUT YOU</span>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">01</div>
              <div className="flex-1 h-1 bg-green-400 mx-2"></div>
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">02</div>
              <div className="flex-1 h-1 bg-orange-500 mx-2"></div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">03</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-2 block">Full Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="border-gray-200 focus:border-teal-400 rounded-lg"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">Age *</Label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="Your age"
                className="border-gray-200 focus:border-teal-400 rounded-lg"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className="border-gray-200 focus:border-teal-400 rounded-lg"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="border-gray-200 focus:border-teal-400 rounded-lg"
              />
            </div>

            {userRole === 'patient' && (
              <>
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">Emergency Contact</Label>
                  <Input
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="Emergency contact number"
                    className="border-gray-200 focus:border-teal-400 rounded-lg"
                  />
                </div>

                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">Medical Conditions</Label>
                  <Input
                    value={formData.medicalConditions}
                    onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                    placeholder="Any medical conditions"
                    className="border-gray-200 focus:border-teal-400 rounded-lg"
                  />
                </div>
              </>
            )}

            <div className="flex space-x-3 pt-4">
              <Button
                onClick={() => setStep('role-selection')}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-600"
              >
                Back
              </Button>
              <Button
                onClick={handleCreateUser}
                disabled={!formData.name || !formData.age}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                Complete Setup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default WelcomeScreen;
