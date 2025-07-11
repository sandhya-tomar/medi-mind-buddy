
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Phone, Plus, Trash2, AlertTriangle, Heart, Clock, Ambulance, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
  relationship: string;
  type: 'emergency' | 'doctor' | 'pharmacy';
}

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: 1, name: 'Dr. Sharma (Family Doctor)', phone: '+91-98765-43210', relationship: 'Primary Doctor', type: 'doctor' },
    { id: 2, name: 'Priya Patel', phone: '+91-87654-32109', relationship: 'Emergency Contact', type: 'emergency' },
    { id: 3, name: 'Apollo Pharmacy', phone: '+91-76543-21098', relationship: 'Local Pharmacy', type: 'pharmacy' },
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
    type: 'emergency' as 'emergency' | 'doctor' | 'pharmacy'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in name and phone number.",
        variant: "destructive"
      });
      return;
    }

    const contact: EmergencyContact = {
      id: Date.now(),
      ...newContact
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: '', phone: '', relationship: '', type: 'emergency' });
    setShowAddForm(false);
    
    toast({
      title: "Contact Added! 📞",
      description: `${contact.name} has been added to your emergency contacts.`,
    });
  };

  const removeContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact Removed",
      description: "Emergency contact has been deleted.",
    });
  };

  const callContact = (phone: string, name: string) => {
    // In a real app, this would initiate a phone call
    toast({
      title: "Calling... 📞",
      description: `Initiating call to ${name} at ${phone}`,
    });
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'doctor': return <Heart className="w-5 h-5 text-blue-500" />;
      case 'pharmacy': return <Plus className="w-5 h-5 text-green-500" />;
      default: return <Phone className="w-5 h-5 text-red-500" />;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'pharmacy': return 'bg-green-100 text-green-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Indian Emergency Services Alert */}
      <Card className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-l-4 border-l-red-500 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
            <div>
              <h3 className="font-bold text-xl text-red-800">🇮🇳 Indian Emergency Services</h3>
              <p className="text-red-600 font-medium">In case of emergency, call these numbers immediately</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold p-4 h-auto flex-col space-y-2 shadow-lg"
              onClick={() => callContact('108', 'Emergency Services (All India)')}
            >
              <Ambulance className="w-6 h-6" />
              <div className="text-center">
                <div className="text-lg font-bold">108</div>
                <div className="text-xs">Emergency</div>
              </div>
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold p-4 h-auto flex-col space-y-2 shadow-lg"
              onClick={() => callContact('100', 'Police')}
            >
              <Shield className="w-6 h-6" />
              <div className="text-center">
                <div className="text-lg font-bold">100</div>
                <div className="text-xs">Police</div>
              </div>
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold p-4 h-auto flex-col space-y-2 shadow-lg"
              onClick={() => callContact('101', 'Fire Brigade')}
            >
              🚒
              <div className="text-center">
                <div className="text-lg font-bold">101</div>
                <div className="text-xs">Fire</div>
              </div>
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold p-4 h-auto flex-col space-y-2 shadow-lg"
              onClick={() => callContact('102', 'Ambulance')}
            >
              🚑
              <div className="text-center">
                <div className="text-lg font-bold">102</div>
                <div className="text-xs">Ambulance</div>
              </div>
            </Button>
          </div>
          
          {/* Additional Important Numbers */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="border-purple-300 text-purple-700 hover:bg-purple-50 p-3 h-auto flex-col space-y-1"
              onClick={() => callContact('1097', 'Women Helpline')}
            >
              <div className="font-bold">1097</div>
              <div className="text-xs">Women Helpline</div>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-teal-300 text-teal-700 hover:bg-teal-50 p-3 h-auto flex-col space-y-1"
              onClick={() => callContact('1950', 'Poison Control')}
            >
              <div className="font-bold">1950</div>
              <div className="text-xs">Poison Control</div>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 p-3 h-auto flex-col space-y-1"
              onClick={() => toast({ title: "Medical ID", description: "Showing medical information..." })}
            >
              🆔
              <div className="text-xs">Medical ID</div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Emergency Contacts List */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-6 h-6" />
              <span>Personal Emergency Contacts</span>
            </CardTitle>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Add Contact Form */}
          {showAddForm && (
            <Card className="mb-6 bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Contact Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    className="border-blue-300 focus:border-blue-500"
                  />
                  <Input
                    placeholder="Phone Number (e.g., +91-98765-43210)"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    className="border-blue-300 focus:border-blue-500"
                  />
                  <Input
                    placeholder="Relationship"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                    className="border-blue-300 focus:border-blue-500"
                  />
                  <select 
                    className="p-2 border border-blue-300 rounded-md focus:border-blue-500"
                    value={newContact.type}
                    onChange={(e) => setNewContact({...newContact, type: e.target.value as any})}
                  >
                    <option value="emergency">Emergency Contact</option>
                    <option value="doctor">Doctor</option>
                    <option value="pharmacy">Pharmacy</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addContact} className="bg-gradient-to-r from-blue-500 to-purple-500">
                    Add Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contacts List */}
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
                        {getContactIcon(contact.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{contact.name}</h3>
                        <p className="text-gray-600 font-medium">{contact.phone}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getContactColor(contact.type)}>
                            {contact.type.toUpperCase()}
                          </Badge>
                          {contact.relationship && (
                            <span className="text-sm text-gray-500">{contact.relationship}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        onClick={() => callContact(contact.phone, contact.name)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeContact(contact.id)}
                        className="text-red-600 hover:bg-red-50 border-red-300"
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

      {/* Quick Medical Info */}
      <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 shadow-lg border border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-6 h-6" />
            <span>Quick Medical Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold mb-2 text-gray-800">🩸 Blood Type</h4>
              <p className="text-gray-600">A+ (Update in settings)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold mb-2 text-gray-800">🤧 Allergies</h4>
              <p className="text-gray-600">Penicillin, Shellfish</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold mb-2 text-gray-800">💊 Current Medications</h4>
              <p className="text-gray-600">Lisinopril, Metformin, Aspirin</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold mb-2 text-gray-800">🏥 Insurance</h4>
              <p className="text-gray-600">ESIC / Ayushman Bharat</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyContacts;
