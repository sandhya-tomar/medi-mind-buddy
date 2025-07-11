import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Pill, CheckCircle, AlertCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/hooks/use-toast';

const MedicationTracker = () => {
  const { medications, markMedicationTaken } = useUser();

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Heart': 'bg-red-100 text-red-800',
      'Diabetes': 'bg-blue-100 text-blue-800',
      'Blood Pressure': 'bg-green-100 text-green-800',
      'Pain': 'bg-yellow-100 text-yellow-800',
      'Mental Health': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const completedCount = medications.filter(med => med.taken).length;
  const totalCount = medications.length;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleMedicationTaken = (id: string, name: string) => {
    markMedicationTaken(id);
    toast({
      title: "Medication Taken! 💊",
      description: `Great job taking your ${name}!`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="w-6 h-6 text-blue-600" />
            <span>Today's Medication Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Daily Progress</span>
              <span className="text-sm text-gray-500">{completedCount}/{totalCount} medications</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>

          <div className="grid gap-4">
            {medications.map((medication) => (
              <Card key={medication.id} className={`transition-all duration-300 hover:shadow-lg ${medication.taken ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${medication.taken ? 'bg-green-500' : 'bg-gray-200'}`}>
                        {medication.taken ? 
                          <CheckCircle className="w-6 h-6 text-white" /> : 
                          <Pill className="w-6 h-6 text-gray-500" />
                        }
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{medication.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{medication.time}</span>
                          <Badge className={getTypeColor(medication.type)}>
                            {medication.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!medication.taken && (
                        <Button 
                          onClick={() => handleMedicationTaken(medication.id, medication.name)}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        >
                          Mark Taken
                        </Button>
                      )}
                      {medication.taken && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          ✅ Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {completionPercentage === 100 && (
            <Card className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">🎉 Perfect Day!</h3>
                <p>You've taken all your medications today. Keep up the great work!</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationTracker;
