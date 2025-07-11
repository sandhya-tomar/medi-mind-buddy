
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Send, User, Bot, Heart, AlertTriangle, Lightbulb, Globe, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'suggestion' | 'warning' | 'info';
  language?: 'en' | 'hi';
}

const AIHealthAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI Health Assistant. I can help you with medication reminders, health tips, and answer questions about your conditions. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'info',
      language: 'en'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const getAIResponse = (userInput: string, language: 'en' | 'hi' = 'en'): { text: string; type?: 'suggestion' | 'warning' | 'info' } => {
    const input = userInput.toLowerCase();
    
    // Hindi keyword detection
    const hindiKeywords = {
      diabetes: ['मधुमेह', 'डायबिटीज', 'शुगर'],
      heart: ['दिल', 'हृदय', 'हार्ट'],
      medication: ['दवा', 'दवाई', 'गोली'],
      headache: ['सिरदर्द', 'सिर दर्द'],
      exercise: ['व्यायाम', 'कसरत', 'एक्सरसाइज'],
      diet: ['आहार', 'खाना', 'डाइट'],
      pain: ['दर्द', 'पीड़ा']
    };

    const containsKeyword = (keywords: string[]) => 
      keywords.some(keyword => input.includes(keyword));

    // English responses
    const englishResponses = {
      diabetes: {
        text: "For diabetes management: 📊 Monitor your blood sugar regularly, 💊 take medications as prescribed, 🥗 maintain a balanced diet with controlled carbs, and 🚶‍♂️ exercise regularly. Would you like specific meal suggestions or exercise routines?",
        type: 'suggestion' as const
      },
      heart: {
        text: "⚠️ For heart-related concerns: Take prescribed medications on time, avoid excessive salt, exercise moderately, and manage stress. If you're experiencing chest pain, shortness of breath, or unusual symptoms, seek immediate medical attention!",
        type: 'warning' as const
      },
      medication: {
        text: "Medication reminders: 📅 Set consistent daily schedules, 📱 use apps like this one, 💊 organize pills in weekly containers, and 📝 keep a medication diary. Never skip doses without consulting your doctor!",
        type: 'info' as const
      },
      headache: {
        text: "For headache relief: 💧 Stay hydrated, 😴 ensure adequate sleep, 🧘‍♀️ practice relaxation techniques, and 💊 take pain relievers as needed. Track triggers like stress, certain foods, or lack of sleep.",
        type: 'suggestion' as const
      },
      exercise: {
        text: "🏃‍♂️ Safe exercise tips: Start slowly, listen to your body, stay hydrated, and consult your doctor about exercise limitations. Activities like walking, swimming, and gentle yoga are often great starting points!",
        type: 'suggestion' as const
      },
      diet: {
        text: "🥗 Nutrition advice: Focus on whole foods, plenty of vegetables, lean proteins, and whole grains. Limit processed foods, excessive sugar, and sodium. Consider consulting a nutritionist for personalized meal plans!",
        type: 'suggestion' as const
      }
    };

    // Hindi responses
    const hindiResponses = {
      diabetes: {
        text: "मधुमेह प्रबंधन के लिए: 📊 नियमित रूप से ब्लड शुगर चेक करें, 💊 डॉक्टर की सलाह के अनुसार दवाएं लें, 🥗 संतुलित आहार लें और कार्बोहाइड्रेट कम करें, और 🚶‍♂️ नियमित व्यायाम करें। क्या आपको विशिष्ट भोजन या व्यायाम सुझाव चाहिए?",
        type: 'suggestion' as const
      },
      heart: {
        text: "⚠️ हृदय संबंधी समस्याओं के लिए: समय पर दवाएं लें, अधिक नमक से बचें, मध्यम व्यायाम करें, और तनाव को नियंत्रित करें। यदि आपको सीने में दर्द, सांस लेने में कठिनाई या असामान्य लक्षण हैं, तुरंत चिकित्सा सहायता लें!",
        type: 'warning' as const
      },
      medication: {
        text: "दवा रिमाइंडर: 📅 नियमित दैनिक समय निर्धारित करें, 📱 इस जैसे ऐप्स का उपयोग करें, 💊 साप्ताहिक गोली बॉक्स में व्यवस्थित करें, और 📝 दवा डायरी रखें। डॉक्टर की सलाह के बिना कभी भी खुराक न छोड़ें!",
        type: 'info' as const
      },
      headache: {
        text: "सिरदर्द से राहत के लिए: 💧 पर्याप्त पानी पिएं, 😴 पर्याप्त नींद लें, 🧘‍♀️ विश्राम तकनीकों का अभ्यास करें, और 💊 आवश्यकता के अनुसार दर्द निवारक लें। तनाव, कुछ खाद्य पदार्थ या नींद की कमी जैसे कारकों को ट्रैक करें।",
        type: 'suggestion' as const
      },
      exercise: {
        text: "🏃‍♂️ सुरक्षित व्यायाम सुझाव: धीरे-धीरे शुरू करें, अपने शरीर की सुनें, हाइड्रेटेड रहें, और व्यायाम सीमाओं के बारे में डॉक्टर से सलाह लें। चलना, तैराकी और हल्का योग अक्सर बेहतरीन शुरुआती गतिविधियां हैं!",
        type: 'suggestion' as const
      },
      diet: {
        text: "🥗 पोषण सलाह: संपूर्ण खाद्य पदार्थों, सब्जियों, दुबला प्रोटीन और साबुत अनाज पर ध्यान दें। प्रसंस्कृत खाद्य पदार्थ, अधिक चीनी और नमक से बचें। व्यक्तिगत भोजन योजना के लिए पोषण विशेषज्ञ से सलाह लें!",
        type: 'suggestion' as const
      }
    };

    const responses = language === 'hi' ? hindiResponses : englishResponses;

    // Check for keywords and return appropriate response
    if (input.includes('diabetes') || input.includes('blood sugar') || containsKeyword(hindiKeywords.diabetes)) {
      return responses.diabetes;
    } else if (input.includes('heart') || input.includes('cardiac') || input.includes('chest pain') || containsKeyword(hindiKeywords.heart)) {
      return responses.heart;
    } else if (input.includes('medication') || input.includes('pill') || input.includes('medicine') || containsKeyword(hindiKeywords.medication)) {
      return responses.medication;
    } else if (input.includes('headache') || input.includes('migraine') || containsKeyword(hindiKeywords.headache)) {
      return responses.headache;
    } else if (input.includes('exercise') || input.includes('workout') || containsKeyword(hindiKeywords.exercise)) {
      return responses.exercise;
    } else if (input.includes('diet') || input.includes('nutrition') || input.includes('food') || containsKeyword(hindiKeywords.diet)) {
      return responses.diet;
    } else {
      return {
        text: language === 'hi' 
          ? "मैं स्वास्थ्य संबंधी प्रश्नों में आपकी सहायता के लिए यहां हूं! मैं दवाओं, लक्षणों, आहार, व्यायाम और सामान्य कल्याण के बारे में जानकारी प्रदान कर सकता हूं। आप किस विशिष्ट स्वास्थ्य विषय पर चर्चा करना चाहते हैं?"
          : "I'm here to help with health-related questions! I can provide information about medications, symptoms, diet, exercise, and general wellness. What specific health topic would you like to discuss?",
        type: 'info' as const
      };
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponseData = getAIResponse(inputText, selectedLanguage);
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponseData.text,
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponseData.type,
        language: selectedLanguage
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      toast({
        title: selectedLanguage === 'hi' ? "AI उत्तर तैयार! 🤖" : "AI Response Ready! 🤖",
        description: selectedLanguage === 'hi' ? "मैंने आपके लिए उपयोगी जानकारी प्रदान की है।" : "I've provided some helpful information for you.",
      });
    }, 1500);
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Brain className="w-4 h-4 text-blue-500" />;
      default: return <Bot className="w-4 h-4 text-purple-500" />;
    }
  };

  const quickQuestions = {
    en: [
      "How do I manage diabetes?",
      "What are heart-healthy foods?",
      "Medication side effects help",
      "Safe exercise routines",
      "Headache relief tips"
    ],
    hi: [
      "मधुमेह कैसे नियंत्रित करें?",
      "हृदय के लिए स्वस्थ भोजन क्या है?",
      "दवा के साइड इफेक्ट्स",
      "सुरक्षित व्यायाम",
      "सिरदर्द से राहत"
    ]
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="w-8 h-8 animate-pulse text-cyan-300" />
                <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300 animate-bounce" />
              </div>
              <div>
                <span className="text-2xl font-bold">AI Health Assistant</span>
                <p className="text-sm text-indigo-200 font-medium">
                  {selectedLanguage === 'hi' ? 'बुद्धिमान स्वास्थ्य सहायक' : 'Intelligent Health Companion'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-400 text-green-900 px-3 py-1 font-semibold">
                🟢 {selectedLanguage === 'hi' ? 'ऑनलाइन' : 'Online'}
              </Badge>
              <Select value={selectedLanguage} onValueChange={(value: 'en' | 'hi') => setSelectedLanguage(value)}>
                <SelectTrigger className="w-32 bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="hi">🇮🇳 हिंदी</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Language Indicator */}
          <div className="mb-4 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-600">
              {selectedLanguage === 'hi' ? 'वर्तमान भाषा: हिंदी' : 'Current Language: English'}
            </span>
          </div>

          {/* Quick Questions */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3 text-gray-600">
              {selectedLanguage === 'hi' ? 'त्वरित प्रश्न:' : 'Quick Questions:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions[selectedLanguage].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText(question)}
                  className="text-xs hover:bg-purple-50 border-purple-200 hover:border-purple-300"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto bg-gradient-to-b from-white to-gray-50 rounded-lg p-4 mb-4 border-2 border-gray-100 shadow-inner">
            {messages.map((message) => (
              <div key={message.id} className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow-lg ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : message.type === 'warning'
                    ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-2 border-red-200'
                    : message.type === 'suggestion'
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-100 text-yellow-800 border-2 border-yellow-200'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-2 border-gray-200'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.sender === 'ai' && getMessageIcon(message.type)}
                    {message.sender === 'user' && <User className="w-4 h-4 text-white" />}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-70 mt-2 flex items-center space-x-1">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.language === 'hi' && <span className="text-xs">🇮🇳</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-4 py-3 rounded-xl shadow-lg border-2 border-purple-200">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-purple-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-xs">
                      {selectedLanguage === 'hi' ? 'सोच रहा हूं...' : 'Thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex space-x-3">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={selectedLanguage === 'hi' 
                ? "अपने स्वास्थ्य, दवाओं या लक्षणों के बारे में पूछें..." 
                : "Ask me about your health, medications, or symptoms..."}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 border-2 border-purple-200 focus:border-purple-400 rounded-xl px-4 py-3"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 px-6 py-3 rounded-xl shadow-lg"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIHealthAssistant;
