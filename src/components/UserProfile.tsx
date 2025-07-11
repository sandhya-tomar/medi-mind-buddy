import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { User, Edit3, Save, X } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const UserProfile = () => {
  const { currentUser, updateUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    age: currentUser?.age || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    emergencyContact: currentUser?.emergencyContact || '',
    medicalConditions: currentUser?.medicalConditions || '',
    allergies: currentUser?.allergies || '',
    doctorName: currentUser?.doctorName || '',
    doctorPhone: currentUser?.doctorPhone || ''
  });

  // Update profile data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        age: currentUser.age || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        emergencyContact: currentUser.emergencyContact || '',
        medicalConditions: currentUser.medicalConditions || '',
        allergies: currentUser.allergies || '',
        doctorName: currentUser.doctorName || '',
        doctorPhone: currentUser.doctorPhone || ''
      });
    }
  }, [currentUser]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    updateUserProfile(profileData);
    toast({
      title: "Profile Updated! ✅",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to current user data
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        age: currentUser.age || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        emergencyContact: currentUser.emergencyContact || '',
        medicalConditions: currentUser.medicalConditions || '',
        allergies: currentUser.allergies || '',
        doctorName: currentUser.doctorName || '',
        doctorPhone: currentUser.doctorPhone || ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6 text-blue-600" />
              <span>Profile Information</span>
            </div>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
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
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-blue-200 focus:border-blue-400"
                />
              ) : (
                <p className="p-2 bg-white rounded border">{profileData.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              {isEditing ? (
                <Input
                  id="age"
                  type="number"
                  value={profileData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="border-blue-200 focus:border-blue-400"
                />
              ) : (
                <p className="p-2 bg-white rounded border">{profileData.age} years</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-blue-200 focus:border-blue-400"
                />
              ) : (
                <p className="p-2 bg-white rounded border">{profileData.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="border-blue-200 focus:border-blue-400"
                />
              ) : (
                <p className="p-2 bg-white rounded border">{profileData.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              {isEditing ? (
                <Input
                  id="emergencyContact"
                  value={profileData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className="border-blue-200 focus:border-blue-400"
                />
              ) : (
                <p className="p-2 bg-white rounded border">{profileData.emergencyContact}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctorName">Doctor Name</Label>
              {isEditing ? (
                <Input
                  id="doctorName"
                  value={profileData.doctorName}
                  onChange={(e) => handleInputChange('doctorName', e.target.value)}
                  className="border-blue-200 focus:border-blue-400"
                />
              ) : (
                <p className="p-2 bg-white rounded border">{profileData.doctorName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctorPhone">Doctor Phone</Label>
              {isEditing ? (
                <Input
                  id="doctorPhone"
                  value={profileData.doctorPhone}
                  onChange={(e) => handleInputChange('doctorPhone', e.target.value)}
                  className="border-blue-200 focus:border-blue-400"
                />
              ) : (
                <p className="p-2 bg-white rounded border">{profileData.doctorPhone}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              {isEditing ? (
                <Textarea
                  id="medicalConditions"
                  value={profileData.medicalConditions}
                  onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                  placeholder="List your medical conditions..."
                  className="border-blue-200 focus:border-blue-400"
                  rows={3}
                />
              ) : (
                <p className="p-2 bg-white rounded border">{profileData.medicalConditions}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              {isEditing ? (
                <Textarea
                  id="allergies"
                  value={profileData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  placeholder="List your allergies..."
                  className="border-blue-200 focus:border-blue-400"
                  rows={3}
                />
              ) : (
                <p className="p-2 bg-white rounded border">{profileData.allergies}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
