import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VoiceReminder = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [voiceCommands, setVoiceCommands] = useState([
    { command: 'Set reminder for aspirin at 9 AM', response: 'Reminder set for Aspirin at 9:00 AM' },
    { command: 'What medications do I take?', response: 'You currently take Aspirin, Metformin, and Lisinopril' },
    { command: 'Read my health stats', response: 'Your blood pressure is 120/80, heart rate is 72 BPM' },
  ]);

  const [customReminders, setCustomReminders] = useState([
    { time: '09:00', message: 'Time to take your morning Aspirin', active: true },
    { time: '12:00', message: 'Remember to take Metformin with lunch', active: true },
    { time: '18:00', message: 'Evening Lisinopril dose', active: true },
    { time: '21:00', message: 'Check your blood pressure before bed', active: false },
  ]);

  const [newReminderText, setNewReminderText] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');

  // Mock speech recognition
  const startVoiceRecognition = () => {
    setIsListening(true);
    setTranscript('Listening...');
    
    setTimeout(() => {
      const mockCommands = [
        'Set reminder for blood pressure medicine at 8 PM',
        'What are my medications for today?',
        'Read my health summary',
        'Cancel my next reminder',
        'How is my health streak?'
      ];
      
      const randomCommand = mockCommands[Math.floor(Math.random() * mockCommands.length)];
      setTranscript(randomCommand);
      processVoiceCommand(randomCommand);
      setIsListening(false);
    }, 2000);
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('set reminder')) {
      toast({
        title: "Voice Command Processed! 🎤",
        description: "Reminder has been set successfully",
      });
      speakResponse("I've set your medication reminder for you.");
    } else if (lowerCommand.includes('medications') || lowerCommand.includes('medicine')) {
      speakResponse("Today you need to take Aspirin at 9 AM, Metformin at 12 PM, and Lisinopril at 6 PM.");
    } else if (lowerCommand.includes('health')) {
      speakResponse("Your health stats look good. Blood pressure is 120 over 80, heart rate is 72 beats per minute, and you're on a 7-day streak!");
    } else {
      speakResponse("I'm sorry, I didn't understand that command. Please try again.");
    }
  };

  const speakResponse = (text: string) => {
    if (!voiceEnabled) return;
    
    setIsSpeaking(true);
    
    // Mock text-to-speech
    setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);
    
    toast({
      title: "🔊 Speaking",
      description: text,
    });
  };

  const addCustomReminder = () => {
    if (!newReminderText || !newReminderTime) {
      toast({
        title: "Missing Information",
        description: "Please provide both time and reminder message",
        variant: "destructive"
      });
      return;
    }

    const newReminder = {
      time: newReminderTime,
      message: newReminderText,
      active: true
    };

    setCustomReminders([...customReminders, newReminder]);
    setNewReminderText('');
    setNewReminderTime('');
    
    toast({
      title: "Voice Reminder Added! 🔊",
      description: `Reminder set for ${newReminderTime}`,
    });
  };

  const toggleReminder = (index: number) => {
    const updated = [...customReminders];
    updated[index].active = !updated[index].active;
    setCustomReminders(updated);
    
    toast({
      title: updated[index].active ? "Reminder Enabled" : "Reminder Disabled",
      description: `Voice reminder at ${updated[index].time} ${updated[index].active ? 'activated' : 'deactivated'}`,
    });
  };

  const testVoiceReminder = (message: string) => {
    speakResponse(message);
  };

  return (
    <div className="space-y-6">
      {/* Voice Control Panel */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mic className="w-6 h-6 text-purple-600" />
            <span>Voice Assistant</span>
            <Badge variant="secondary" className={voiceEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {voiceEnabled ? "🟢 Active" : "🔴 Disabled"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voice Recognition */}
            <div className="space-y-4">
              <h3 className="font-semibold">🎤 Voice Commands</h3>
              <div className="bg-white p-4 rounded-lg border min-h-20">
                <p className="text-gray-600 mb-2">Say something:</p>
                <p className="font-medium text-lg">{transcript || 'Click the microphone to start...'}</p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={startVoiceRecognition}
                  disabled={isListening}
                  className={`flex-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                  {isListening ? 'Listening...' : 'Start Voice Command'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={voiceEnabled ? 'text-green-600' : 'text-red-600'}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Voice Settings */}
            <div className="space-y-4">
              <h3 className="font-semibold">⚙️ Voice Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <span>Voice Reminders</span>
                  <Button
                    size="sm"
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={voiceEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}
                  >
                    {voiceEnabled ? 'ON' : 'OFF'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <span>Speaking Volume</span>
                  <div className="flex items-center space-x-2">
                    <VolumeX className="w-4 h-4 text-gray-400" />
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-12 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <Volume2 className="w-4 h-4 text-blue-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                  <span>Voice Speed</span>
                  <Badge>Normal</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Commands */}
          <div className="mt-6">
            <h4 className="font-medium mb-3">💡 Try these voice commands:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Set reminder for aspirin at 9 AM",
                "What medications do I take today?",
                "Read my health summary",
                "How's my medication streak?",
                "Cancel my next reminder",
                "What's my blood pressure?"
              ].map((command, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTranscript(command);
                    processVoiceCommand(command);
                  }}
                  className="text-left justify-start text-xs"
                >
                  "{command}"
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Voice Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Volume2 className="w-6 h-6 text-blue-600" />
            <span>Voice Reminders Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add New Reminder */}
          <Card className="mb-6 bg-gray-50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">➕ Add New Voice Reminder</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  type="time"
                  value={newReminderTime}
                  onChange={(e) => setNewReminderTime(e.target.value)}
                  placeholder="Time"
                />
                <Input
                  value={newReminderText}
                  onChange={(e) => setNewReminderText(e.target.value)}
                  placeholder="Reminder message..."
                  className="md:col-span-2"
                />
              </div>
              <Button onClick={addCustomReminder} className="mt-3 w-full">
                Add Voice Reminder
              </Button>
            </CardContent>
          </Card>

          {/* Existing Reminders */}
          <div className="space-y-3">
            {customReminders.map((reminder, index) => (
              <Card key={index} className={`${reminder.active ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${reminder.active ? 'bg-green-500' : 'bg-gray-400'}`}>
                        <Volume2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{reminder.time}</p>
                        <p className="text-gray-600">{reminder.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => testVoiceReminder(reminder.message)}
                        disabled={!voiceEnabled}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => toggleReminder(index)}
                        className={reminder.active ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'}
                      >
                        {reminder.active ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Status */}
      {isSpeaking && (
        <Card className="bg-gradient-to-r from-blue-400 to-purple-400 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-pulse">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">🔊 Speaking...</p>
                <p className="text-blue-100">AI assistant is providing voice feedback</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoiceReminder;
