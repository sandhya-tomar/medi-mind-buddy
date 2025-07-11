
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Activity, Droplet, Thermometer, Eye, TrendingUp, Edit, Star, Sparkles, Trophy, Target } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const HealthDashboard = () => {
  const { healthMetrics } = useUser();

  const getIconForMetric = (name: string) => {
    switch (name) {
      case 'Blood Pressure': return Heart;
      case 'Heart Rate': return Activity;
      case 'Blood Sugar': return Droplet;
      case 'Temperature': return Thermometer;
      default: return Heart;
    }
  };

  const getGradientForMetric = (name: string) => {
    switch (name) {
      case 'Blood Pressure': return 'from-red-400 via-pink-500 to-rose-500';
      case 'Heart Rate': return 'from-blue-400 via-indigo-500 to-purple-500';
      case 'Blood Sugar': return 'from-purple-400 via-violet-500 to-indigo-500';
      case 'Temperature': return 'from-orange-400 via-red-500 to-pink-500';
      default: return 'from-gray-400 via-gray-500 to-gray-600';
    }
  };

  const weeklyGoals = [
    { goal: 'Take medications on time', progress: 85, completed: 6, total: 7, icon: '💊', color: 'from-green-400 to-emerald-500' },
    { goal: 'Daily exercise (30 min)', progress: 71, completed: 5, total: 7, icon: '🏃‍♂️', color: 'from-blue-400 to-cyan-500' },
    { goal: 'Drink 8 glasses of water', progress: 57, completed: 4, total: 7, icon: '💧', color: 'from-cyan-400 to-blue-500' },
    { goal: 'Sleep 8 hours nightly', progress: 43, completed: 3, total: 7, icon: '😴', color: 'from-purple-400 to-indigo-500' },
  ];

  const recentReadings = healthMetrics.slice(0, 4).map((metric, index) => ({
    date: index === 0 ? 'Today' : index === 1 ? 'Yesterday' : `${index + 1} days ago`,
    name: metric.name,
    value: metric.value,
    timestamp: metric.timestamp,
    gradient: getGradientForMetric(metric.name)
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200';
      case 'good': return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200';
      case 'danger': return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200';
      default: return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-10">
      {/* Beautiful Health Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {healthMetrics.map((metric, index) => {
          const IconComponent = getIconForMetric(metric.name);
          const gradient = getGradientForMetric(metric.name);
          
          return (
            <Card key={index} className="relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 shadow-xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-12 translate-x-12"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <Badge className={`${getStatusColor(metric.status)} border-2 px-4 py-2 font-bold text-sm shadow-lg`}>
                    {metric.status.toUpperCase()}
                  </Badge>
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-lg">{metric.name}</h3>
                <p className="text-4xl font-black text-gray-900 mb-4">{metric.value}</p>
                <Progress value={metric.progress} className="h-3 mb-3" />
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 font-semibold">Health score: {metric.progress}%</p>
                  <div className="flex items-center space-x-1">
                    {Array.from({length: 5}).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(metric.progress/20) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Enhanced Weekly Goals */}
        <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">Weekly Health Goals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 relative z-10">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/40">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{goal.icon}</span>
                    <span className="text-lg font-bold text-gray-800">{goal.goal}</span>
                  </div>
                  <Badge className={`bg-gradient-to-r ${goal.color} text-white px-4 py-2 font-bold shadow-lg`}>
                    {goal.completed}/{goal.total} days
                  </Badge>
                </div>
                <Progress value={goal.progress} className="h-4 mb-3" />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-700 font-semibold">{goal.progress}% completed this week</p>
                  <div className="flex items-center space-x-1">
                    {Array.from({length: goal.total}).map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i < goal.completed ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Recent Readings */}
        <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-0 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-green-400 to-teal-400 opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent font-bold">Recent Health Readings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              {recentReadings.map((reading, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${reading.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 text-lg">{reading.date}</span>
                        <p className="text-sm text-gray-600 font-medium">{reading.name}</p>
                      </div>
                    </div>
                    <Badge className={`bg-gradient-to-r ${reading.gradient} text-white px-4 py-2 font-bold text-lg shadow-lg`}>
                      {reading.value}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Health Tips */}
      <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-l-8 border-l-yellow-400 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
        <CardContent className="p-10 relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-xl">
              <Sparkles className="w-9 h-9 text-white animate-pulse" />
            </div>
            <h3 className="font-black text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Today's Health Tips</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <span className="text-4xl">🚶‍♂️</span>
              <div>
                <p className="font-bold text-lg text-gray-800 mb-2">Take a 10-minute walk after meals</p>
                <p className="text-sm text-gray-600 leading-relaxed">Helps with blood sugar control and digestion. Even light movement makes a big difference!</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <span className="text-4xl">💧</span>
              <div>
                <p className="font-bold text-lg text-gray-800 mb-2">Stay hydrated throughout the day</p>
                <p className="text-sm text-gray-600 leading-relaxed">Aim for 8 glasses of water daily. Your body will thank you for it!</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <span className="text-4xl">😴</span>
              <div>
                <p className="font-bold text-lg text-gray-800 mb-2">Maintain consistent sleep schedule</p>
                <p className="text-sm text-gray-600 leading-relaxed">7-9 hours of quality sleep is essential for recovery and health maintenance.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <span className="text-4xl">🧘‍♀️</span>
              <div>
                <p className="font-bold text-lg text-gray-800 mb-2">Practice stress management</p>
                <p className="text-sm text-gray-600 leading-relaxed">Try meditation or deep breathing exercises for just 5 minutes daily.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDashboard;
