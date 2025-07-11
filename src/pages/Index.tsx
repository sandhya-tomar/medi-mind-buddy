import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Heart, Brain, Pill, Mic, Camera, Trophy, AlertTriangle, Phone, Settings, Users, LogOut, Zap, Sparkles, Target, TrendingUp, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from '@/components/WelcomeScreen';
import MedicationTracker from '@/components/MedicationTracker';
import AIHealthAssistant from '@/components/AIHealthAssistant';  
import HealthDashboard from '@/components/HealthDashboard';
import EmergencyContacts from '@/components/EmergencyContacts';
import PillIdentifier from '@/components/PillIdentifier';
import VoiceReminder from '@/components/VoiceReminder';
import UserProfile from '@/components/UserProfile';
import MedicationManager from '@/components/MedicationManager';
import HealthMetricsManager from '@/components/HealthMetricsManager';
import OnboardingModal from '@/components/OnboardingModal';
import PatientManagement from '@/components/PatientManagement';
import NotificationSettings from '@/components/NotificationSettings';

const Index = () => {
  const { currentUser, medications, markMedicationTaken, getAllUsers, switchUser, setCurrentUser } = useUser();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserSwitcher, setShowUserSwitcher] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check authentication first
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [loading, user, navigate]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl font-semibold text-gray-700">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return null;
  }

  // Show welcome screen if no user is selected
  if (!currentUser) {
    return <WelcomeScreen />;
  }

  const completedMeds = medications.filter(med => med.taken).length;
  const totalMeds = medications.length;
  const completionRate = totalMeds > 0 ? (completedMeds / totalMeds) * 100 : 0;
  const nextMedication = medications.find(med => !med.taken);

  const handleMedicationTaken = (index: number) => {
    const medication = medications[index];
    if (medication) {
      markMedicationTaken(medication.id);
      toast({
        title: "Medication Taken! 💊",
        description: `Great job taking your ${medication.name}!`,
      });
    }
  };

  const handleUserSwitch = (userId: string) => {
    switchUser(userId);
    setShowUserSwitcher(false);
    toast({
      title: "Profile Switched! 👤",
      description: "Successfully switched to the selected profile.",
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      localStorage.removeItem('currentUserId');
      toast({
        title: "Signed Out Successfully",
        description: "You have been securely logged out of your account.",
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Logout Error",
        description: "There was an issue signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const allUsers = getAllUsers();

  return (
    <>
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)}
        userName={currentUser.name}
      />
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full animate-float blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full animate-float delay-1000 blur-3xl"></div>
        </div>

        {/* Clean Header */}
        <header className="bg-card/95 backdrop-blur-lg border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center shadow-sm">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gradient">
                    MedMinder
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                    Welcome, {currentUser.name}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Compact Time Display */}
                <div className="hidden sm:block bg-muted/50 rounded-lg px-3 py-2 text-xs">
                  <p className="font-medium text-foreground">{currentTime.toLocaleDateString()}</p>
                </div>

                {/* Compact Health Info */}
                {currentUser.healthStreak > 0 && (
                  <Badge variant="secondary" className="hidden md:flex text-xs px-2 py-1">
                    🔥 {currentUser.healthStreak}d
                  </Badge>
                )}

                {/* Settings Menu */}
                <div className="relative z-50">
                  <Button
                    onClick={() => setShowUserSwitcher(!showUserSwitcher)}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 rounded-full"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  {showUserSwitcher && (
                    <div className="absolute right-0 top-10 bg-card rounded-xl shadow-xl border p-3 min-w-[260px] z-[100]">
                      <div className="space-y-2">
                        <div className="border-b pb-2 mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                              <span className="text-primary-foreground font-bold text-sm">{user?.email?.[0].toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="font-medium text-card-foreground text-sm">{user?.email}</p>
                              <p className="text-xs text-muted-foreground">Account</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => {setActiveTab("settings"); setShowUserSwitcher(false);}}
                          variant="ghost"
                          className="w-full justify-start p-2 h-auto text-sm"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Profile Settings
                        </Button>
                        
                        {allUsers.filter(user => user.id !== currentUser.id).length > 0 && (
                          <div className="border-t pt-2">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Switch Profile</p>
                            {allUsers.filter(user => user.id !== currentUser.id).map((user) => (
                              <Button
                                key={user.id}
                                onClick={() => handleUserSwitch(user.id)}
                                variant="ghost"
                                className="w-full justify-start p-2 h-auto text-sm"
                              >
                                <div className="text-left">
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-xs text-muted-foreground">{user.age} years</div>
                                </div>
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        <div className="border-t pt-2">
                          <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="w-full justify-start p-2 h-auto text-sm text-destructive hover:text-destructive"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
          {/* Mobile-Optimized Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="bg-card border-0 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Progress</p>
                    <p className="text-lg sm:text-2xl font-bold text-card-foreground">{completedMeds}/{totalMeds}</p>
                    <p className="text-xs text-muted-foreground">Medications</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                  </div>
                </div>
                <Progress value={completionRate} className="h-2 bg-muted" />
                <p className="text-xs font-medium text-muted-foreground mt-1">{Math.round(completionRate)}% Complete</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-0 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">Health Score</p>
                    <p className="text-lg sm:text-2xl font-bold text-card-foreground">{currentUser.healthScore}%</p>
                    <p className="text-xs text-muted-foreground">Excellent</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-0 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 text-white">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white/90 mb-1">AI Insights</p>
                    <p className="text-lg sm:text-xl font-bold text-white">Active</p>
                    <p className="text-xs text-white/80">Ready</p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-0 px-2 py-1 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Advanced AI
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-500 border-0 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 text-white">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white/90 mb-1">Next</p>
                    <p className="text-lg sm:text-xl font-bold text-white">
                      {nextMedication ? nextMedication.time : '07:52'} AM
                    </p>
                    <p className="text-xs text-white/80 truncate">
                      {nextMedication ? nextMedication.name : 'Paracetamol'}
                    </p>
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile-Optimized Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-card rounded-xl sm:rounded-2xl p-2 sm:p-3 mb-4 sm:mb-6 shadow-lg border-0">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 bg-transparent p-1">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex flex-col items-center p-2 sm:p-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:bg-muted transition-all duration-200"
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                  <span className="text-xs font-medium">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="medications" 
                  className="flex flex-col items-center p-2 sm:p-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:bg-muted transition-all duration-200"
                >
                  <Pill className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                  <span className="text-xs font-medium">Medications</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="ai-assistant" 
                  className="flex flex-col items-center p-2 sm:p-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:bg-muted transition-all duration-200"
                >
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                  <span className="text-xs font-medium">AI Assistant</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="pill-id" 
                  className="flex flex-col items-center p-2 sm:p-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:bg-muted transition-all duration-200"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                  <span className="text-xs font-medium">Pill ID</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="voice" 
                  className="flex flex-col items-center p-2 sm:p-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:bg-muted transition-all duration-200"
                >
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                  <span className="text-xs font-medium">Voice</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex flex-col items-center p-2 sm:p-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:bg-muted transition-all duration-200"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                  <span className="text-xs font-medium">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="dashboard" className="space-y-8">
              <HealthDashboard />
            </TabsContent>

            <TabsContent value="medications" className="space-y-8">
              <MedicationTracker />
            </TabsContent>

            <TabsContent value="ai-assistant" className="space-y-8">
              <AIHealthAssistant />
            </TabsContent>

            <TabsContent value="pill-id" className="space-y-8">
              <PillIdentifier />
            </TabsContent>

            <TabsContent value="voice" className="space-y-8">
              <VoiceReminder />
            </TabsContent>

            <TabsContent value="settings" className="space-y-8">
              <div className="space-y-8">
            <Tabs defaultValue="profile" className="space-y-8">
              <TabsList className="grid w-full grid-cols-5 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-2 border-2 border-white/40">
                <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white font-bold py-4 rounded-xl text-sm">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="medications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white font-bold py-4 rounded-xl text-sm">
                  Medications
                </TabsTrigger>
                <TabsTrigger value="health-metrics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white font-bold py-4 rounded-xl text-sm">
                  Health
                </TabsTrigger>
                <TabsTrigger value="patients" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white font-bold py-4 rounded-xl text-sm">
                  Patients
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white font-bold py-4 rounded-xl text-sm">
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <UserProfile />
              </TabsContent>
              <TabsContent value="medications">
                <MedicationManager />
              </TabsContent>
              <TabsContent value="health-metrics">
                <HealthMetricsManager />
              </TabsContent>
              <TabsContent value="patients">
                <PatientManagement />
              </TabsContent>
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
            </Tabs>
              </div>
            </TabsContent>
          </Tabs>

          {/* Clean AI Assistant Integration */}
          <div className="fixed bottom-4 right-4 z-50">
            <Button 
              size="lg" 
              className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg border-2 border-card text-lg font-bold transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                setActiveTab("ai-assistant");
                toast({ 
                  title: "AI Assistant", 
                  description: "How can I help you today?" 
                });
              }}
            >
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
