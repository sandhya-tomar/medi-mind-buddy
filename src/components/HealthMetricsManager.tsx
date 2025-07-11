
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Plus } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/hooks/use-toast';

const HealthMetricsManager = () => {
  const { currentUser, healthMetrics, updateHealthMetrics } = useUser();
  const [editingMetric, setEditingMetric] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEditStart = (metricId: string, currentValue: string) => {
    setEditingMetric(metricId);
    setEditValue(currentValue);
  };

  const handleEditSave = (metricId: string) => {
    const updatedMetrics = healthMetrics.map(metric => 
      metric.name === metricId 
        ? { ...metric, value: editValue, timestamp: new Date().toISOString() }
        : metric
    );
    updateHealthMetrics(updatedMetrics);
    setEditingMetric(null);
    setEditValue('');
    toast({
      title: "Health Metric Updated! 📊",
      description: `Your ${metricId} has been updated successfully.`,
    });
  };

  const handleEditCancel = () => {
    setEditingMetric(null);
    setEditValue('');
  };

  const addNewReading = (metricName: string) => {
    const metric = healthMetrics.find(m => m.name === metricName);
    if (metric) {
      const newProgress = Math.min(100, Math.max(0, Math.random() * 100));
      const updatedMetrics = healthMetrics.map(m => 
        m.name === metricName 
          ? { ...m, progress: newProgress, timestamp: new Date().toISOString() }
          : m
      );
      updateHealthMetrics(updatedMetrics);
      toast({
        title: "Reading Added! 📈",
        description: `New ${metricName} reading recorded.`,
      });
    }
  };

  const getStatusFromValue = (name: string, value: string) => {
    // Simple logic to determine status based on common health ranges
    switch (name) {
      case 'Blood Pressure':
        const bp = value.split('/');
        const systolic = parseInt(bp[0]);
        if (systolic < 120) return 'normal';
        if (systolic < 140) return 'warning';
        return 'danger';
      case 'Heart Rate':
        const hr = parseInt(value);
        if (hr >= 60 && hr <= 100) return 'normal';
        return 'warning';
      case 'Blood Sugar':
        const bs = parseInt(value);
        if (bs >= 70 && bs <= 100) return 'normal';
        if (bs <= 125) return 'warning';
        return 'danger';
      default:
        return 'normal';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'danger': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Manage Your Health Metrics</span>
            <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
              {currentUser?.name}'s Data
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthMetrics.map((metric) => {
              const status = getStatusFromValue(metric.name, metric.value);
              
              return (
                <Card key={metric.name} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{metric.name}</h3>
                      <Badge className={getStatusColor(status)}>
                        {status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {editingMetric === metric.name ? (
                        <div className="space-y-3">
                          <Label htmlFor={`edit-${metric.name}`}>New Value</Label>
                          <Input
                            id={`edit-${metric.name}`}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            placeholder={`Enter ${metric.name.toLowerCase()}`}
                          />
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => handleEditSave(metric.name)}
                              className="bg-green-500 hover:bg-green-600"
                              size="sm"
                            >
                              <Save className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                            <Button 
                              onClick={handleEditCancel}
                              variant="outline"
                              size="sm"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="text-3xl font-bold text-gray-900">
                            {metric.value}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Last updated: {new Date(metric.timestamp).toLocaleDateString()}
                            </span>
                            <div className="flex space-x-2">
                              <Button 
                                onClick={() => handleEditStart(metric.name, metric.value)}
                                variant="outline"
                                size="sm"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                onClick={() => addNewReading(metric.name)}
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Reading
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetricsManager;
