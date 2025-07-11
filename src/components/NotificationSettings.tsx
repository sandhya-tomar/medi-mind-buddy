import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, MessageSquare, Clock, Save, ArrowLeft } from 'lucide-react';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    push: true,
    caregiver: true,
    email: false,
    wrongCupTone: false
  });

  const [times, setTimes] = useState({
    pushTime: '12:30',
    caregiverTime: '12:30',
    endTime: '01:00'
  });

  const [unlockSettings, setUnlockSettings] = useState({
    hours: 0,
    minutes: 0
  });

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0">
        <CardHeader className="flex flex-row items-center space-y-0 pb-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <CardTitle className="text-xl font-bold">MedMinder Settings</CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg rounded-xl p-1">
          <TabsTrigger 
            value="profile" 
            className="data-[state=active]:bg-teal-500 data-[state=active]:text-white font-semibold py-3 rounded-lg"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:bg-teal-500 data-[state=active]:text-white font-semibold py-3 rounded-lg"
          >
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Times */}
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6 space-y-6">
              <div className="text-center text-lg font-bold text-gray-800 mb-4">
                12:00 PM
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Push Notifications</p>
                    <p className="text-sm text-gray-600">12:30 PM</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Caregiver Notifications</p>
                    <p className="text-sm text-gray-600">12:30 PM</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">End Time</p>
                    <p className="text-sm text-gray-600">01:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reminder Settings */}
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">Reminder to refill box</h3>
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full bg-gray-200">
                  <Mail className="w-5 h-5 text-gray-600" />
                </Button>
                <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full bg-gray-200">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reports */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-teal-600">Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-800">Monthly Report</span>
                <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full bg-gray-200">
                  <Mail className="w-5 h-5 text-gray-600" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-800">Weekly Report</span>
                <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full bg-gray-200">
                  <Mail className="w-5 h-5 text-gray-600" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Wrong Cup Tone */}
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">"Taking out wrong cup" Tone</p>
                </div>
                <Switch
                  checked={notifications.wrongCupTone}
                  onCheckedChange={() => handleNotificationToggle('wrongCupTone')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button className="w-full bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 py-4 rounded-xl font-semibold text-lg">
            SAVE
          </Button>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          {/* Unlock Settings */}
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-gray-800 mb-4">
                Set the time to unlock MedMinder before scheduled start time.
              </h3>

              <div>
                <label className="text-sm font-medium text-teal-600 mb-2 block">Hour(s)</label>
                <Select value={unlockSettings.hours.toString()} onValueChange={(value) => setUnlockSettings(prev => ({ ...prev, hours: parseInt(value) }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5].map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-teal-600 mb-2 block">Minutes</label>
                <Select value={unlockSettings.minutes.toString()} onValueChange={(value) => setUnlockSettings(prev => ({ ...prev, minutes: parseInt(value) }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 15, 30, 45].map((minute) => (
                      <SelectItem key={minute} value={minute.toString()}>{minute}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                <p>
                  Please note that the pillbox will unlock at the earliest at 12:15 am on the day of the dose 
                  and will lock at the latest at 11:45 pm.
                </p>
              </div>

              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold">
                SAVE
              </Button>
            </CardContent>
          </Card>

          {/* Deregister Device */}
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-800 mb-4">Deregister Device</h3>
              <Button className="w-full bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 py-4 rounded-xl font-semibold text-lg">
                DEREGISTER DEVICE
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationSettings;