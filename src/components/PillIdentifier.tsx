
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Search, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PillResult {
  name: string;
  description: string;
  dosage: string;
  warnings: string[];
  uses: string[];
  sideEffects: string[];
  confidence: number;
}

const PillIdentifier = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pillResults, setPillResults] = useState<PillResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockPillDatabase = [
    {
      name: 'Aspirin 81mg',
      description: 'Low-dose aspirin, white round tablet',
      dosage: '81mg daily',
      warnings: ['Do not take with blood thinners', 'Consult doctor if pregnant'],
      uses: ['Heart attack prevention', 'Blood clot prevention', 'Pain relief'],
      sideEffects: ['Stomach upset', 'Nausea', 'Increased bleeding risk'],
      confidence: 95
    },
    {
      name: 'Metformin 500mg',
      description: 'White oval tablet for diabetes management',
      dosage: '500mg twice daily with meals',
      warnings: ['Take with food', 'Monitor kidney function', 'Stop before surgery'],
      uses: ['Type 2 diabetes management', 'Blood sugar control', 'PCOS treatment'],
      sideEffects: ['Diarrhea', 'Nausea', 'Metallic taste', 'Vitamin B12 deficiency'],
      confidence: 88
    },
    {
      name: 'Lisinopril 10mg',
      description: 'Light pink round tablet for blood pressure',
      dosage: '10mg once daily',
      warnings: ['May cause dizziness', 'Avoid potassium supplements', 'Monitor blood pressure'],
      uses: ['High blood pressure', 'Heart failure', 'Kidney protection'],
      sideEffects: ['Dry cough', 'Dizziness', 'Fatigue', 'Elevated potassium'],
      confidence: 92
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzePill();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePill = () => {
    setIsAnalyzing(true);
    toast({
      title: "Analyzing Pill... 🔍",
      description: "Using AI to identify your medication",
    });

    // Simulate AI analysis
    setTimeout(() => {
      const randomResults = mockPillDatabase
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 2) + 1);
      
      setPillResults(randomResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete! ✅",
        description: `Found ${randomResults.length} possible matches`,
      });
    }, 3000);
  };

  const searchPills = () => {
    if (!searchQuery.trim()) return;

    const filteredResults = mockPillDatabase.filter(pill =>
      pill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pill.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setPillResults(filteredResults);
    toast({
      title: "Search Complete! 🔍",
      description: `Found ${filteredResults.length} matching medications`,
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-6 h-6 text-purple-600" />
            <span>Pill Identifier</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              AI Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="font-semibold">📸 Upload Pill Image</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected pill" 
                      className="max-w-full h-32 object-contain mx-auto rounded-lg"
                    />
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600 mb-2">Take a clear photo of your pill</p>
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Text Search */}
            <div className="space-y-4">
              <h3 className="font-semibold">🔍 Search by Name/Description</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Enter pill name, color, shape, or imprint..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchPills()}
                />
                <Button 
                  onClick={searchPills}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Pills
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">💡 Search Tips:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Include pill color and shape</li>
                  <li>• Mention any numbers or letters</li>
                  <li>• Try brand or generic names</li>
                  <li>• Describe special markings</li>
                </ul>
              </div>
            </div>
          </div>

          {isAnalyzing && (
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-purple-600">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                <span>Analyzing pill with AI...</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {pillResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Identification Results</h2>
          {pillResults.map((pill, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-blue-700">{pill.name}</CardTitle>
                    <p className="text-gray-600 mt-1">{pill.description}</p>
                  </div>
                  <Badge className={getConfidenceColor(pill.confidence)}>
                    {pill.confidence}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold flex items-center mb-2">
                        <Info className="w-4 h-4 mr-2 text-blue-500" />
                        Dosage Information
                      </h4>
                      <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{pill.dosage}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Common Uses
                      </h4>
                      <ul className="space-y-1">
                        {pill.uses.map((use, idx) => (
                          <li key={idx} className="text-gray-700 flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold flex items-center mb-2">
                        <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                        Warnings
                      </h4>
                      <ul className="space-y-1">
                        {pill.warnings.map((warning, idx) => (
                          <li key={idx} className="text-yellow-700 bg-yellow-50 p-2 rounded flex items-start">
                            <span className="text-yellow-500 mr-2">⚠️</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center mb-2">
                        <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                        Possible Side Effects
                      </h4>
                      <ul className="space-y-1">
                        {pill.sideEffects.map((effect, idx) => (
                          <li key={idx} className="text-gray-700 flex items-center">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-800 mb-2">⚠️ Important Medical Disclaimer</h3>
              <div className="text-red-700 space-y-2">
                <p>• This tool is for informational purposes only and should not replace professional medical advice</p>
                <p>• Always consult your healthcare provider before taking any medication</p>
                <p>• Pill identification results may not be 100% accurate</p>
                <p>• If you have concerns about a medication, contact your doctor or pharmacist immediately</p>
                <p>• In case of accidental ingestion or overdose, call Poison Control: 1-800-222-1222</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PillIdentifier;
