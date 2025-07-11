
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Heart, 
  Pill, 
  Phone, 
  Camera, 
  Mic, 
  Users, 
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const OnboardingModal = ({ isOpen, onClose, userName }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      title: "Welcome to MedMinder AI! 🎉",
      subtitle: `नमस्ते ${userName}! आपका स्वागत है`,
      icon: Brain,
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🤖💊</div>
          <p className="text-lg text-gray-600">
            Your intelligent health companion is ready to help you manage medications, 
            track health metrics, and provide AI-powered insights in both English and Hindi!
          </p>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
            CS Student Project ✨
          </Badge>
        </div>
      )
    },
    {
      title: "Smart Medication Tracking 💊",
      subtitle: "Never miss a dose again",
      icon: Pill,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="text-center">
                <div className="text-3xl mb-2">⏰</div>
                <p className="font-semibold">Smart Reminders</p>
                <p className="text-sm text-gray-600">Get timely notifications</p>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <p className="font-semibold">Progress Tracking</p>
                <p className="text-sm text-gray-600">Monitor adherence</p>
              </div>
            </Card>
          </div>
          <p className="text-center text-gray-600">
            Add your medications, set schedules, and let AI help you stay on track!
          </p>
        </div>
      )
    },
    {
      title: "AI Health Assistant 🤖",
      subtitle: "Your 24/7 health companion",
      icon: Brain,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Brain className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-semibold">Bilingual AI Support</p>
                <p className="text-sm text-gray-600">Ask in English or Hindi</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>"What should I do if I miss a dose?"</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>"मुझे सिरदर्द हो रहा है, क्या करूं?"</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>"Explain my health metrics"</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Amazing Features 🌟",
      subtitle: "Everything you need in one place",
      icon: Star,
      content: (
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 bg-gradient-to-br from-orange-50 to-red-50">
            <Camera className="w-6 h-6 text-orange-600 mb-2" />
            <p className="font-semibold text-sm">Pill Identifier</p>
            <p className="text-xs text-gray-600">Scan unknown pills</p>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-green-50 to-teal-50">
            <Mic className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-semibold text-sm">Voice Commands</p>
            <p className="text-xs text-gray-600">Hands-free control</p>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50">
            <Heart className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-semibold text-sm">Health Metrics</p>
            <p className="text-xs text-gray-600">Track vital signs</p>
          </Card>
          <Card className="p-3 bg-gradient-to-br from-red-50 to-pink-50">
            <Phone className="w-6 h-6 text-red-600 mb-2" />
            <p className="font-semibold text-sm">Emergency SOS</p>
            <p className="text-xs text-gray-600">Quick help access</p>
          </Card>
        </div>
      )
    },
    {
      title: "Ready to Start! 🚀",
      subtitle: "Your health journey begins now",
      icon: Sparkles,
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎯✨</div>
          <p className="text-lg text-gray-600">
            You're all set! Start by adding your medications or ask the AI assistant anything.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800 mb-2">Pro Tips:</p>
            <ul className="text-sm text-blue-700 space-y-1 text-left">
              <li>• Click the floating AI button for instant help</li>
              <li>• Use Hindi or English - AI understands both!</li>
              <li>• Set up emergency contacts for safety</li>
              <li>• Track daily health metrics for better insights</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finish = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    onClose();
  };

  const currentStepData = onboardingSteps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gradient">
                  {currentStepData.title}
                </DialogTitle>
                <p className="text-gray-600 font-medium">{currentStepData.subtitle}</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 border-blue-200">
              {currentStep + 1} of {onboardingSteps.length}
            </Badge>
          </div>
        </DialogHeader>

        <CardContent className="p-6">
          {currentStepData.content}
        </CardContent>

        <div className="flex justify-between items-center p-6 border-t">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="flex space-x-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep 
                    ? 'bg-blue-500' 
                    : index < currentStep 
                      ? 'bg-green-400' 
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {currentStep === onboardingSteps.length - 1 ? (
            <Button
              onClick={finish}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 flex items-center space-x-2"
            >
              <span>Let's Go!</span>
              <Sparkles className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
