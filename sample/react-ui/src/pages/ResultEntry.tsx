import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Trophy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Result {
  id: string;
  type: "practice" | "test" | "exam";
  totalMarks: number;
  achievedMarks: number;
  date: string;
}

const ResultEntry = () => {
  const navigate = useNavigate();
  const { subject, chapterId } = useParams();
  
  const [resultType, setResultType] = useState<"practice" | "test" | "exam">("practice");
  const [totalMarks, setTotalMarks] = useState("");
  const [achievedMarks, setAchievedMarks] = useState("");
  
  // Mock data for existing results
  const [existingResults] = useState<Result[]>([
    { id: "1", type: "test", totalMarks: 100, achievedMarks: 85, date: "2024-01-15" },
    { id: "2", type: "practice", totalMarks: 50, achievedMarks: 38, date: "2024-01-10" },
  ]);

  const subjectName = subject?.replace("-", " ").toUpperCase() || "SUBJECT";
  const chapterName = "Chapter " + chapterId; // In real app, this would be fetched

  const handleSave = () => {
    if (!totalMarks || !achievedMarks) return;
    
    // In real app, this would save to backend/localStorage
    console.log("Saving result:", {
      type: resultType,
      totalMarks: parseInt(totalMarks),
      achievedMarks: parseInt(achievedMarks),
      date: new Date().toISOString().split('T')[0]
    });
    
    navigate(`/chapters/${subject}`);
  };

  const getTypeConfig = (type: "practice" | "test" | "exam") => {
    switch (type) {
      case "practice":
        return { color: "bg-blue-100 text-blue-700", icon: "📝" };
      case "test":
        return { color: "bg-yellow-100 text-yellow-700", icon: "📋" };
      case "exam":
        return { color: "bg-red-100 text-red-700", icon: "🎯" };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(`/chapters/${subject}`)}
            className="p-2 hover:bg-gray-100 rounded-full tap-highlight"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">Add Result</h1>
            <p className="text-sm text-gray-600">{subjectName} • {chapterName}</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-8">
        <div className="max-w-sm mx-auto">
          {/* Add New Result Form */}
          <div className="bg-white rounded-xl p-6 card-shadow mb-6 animate-fade-in">
            <h3 className="font-semibold text-gray-900 mb-4">New Result</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                  Type
                </Label>
                <Select value={resultType} onValueChange={(value: "practice" | "test" | "exam") => setResultType(value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="practice">Practice</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalMarks" className="text-sm font-medium text-gray-700">
                    Total Marks
                  </Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    placeholder="100"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="achievedMarks" className="text-sm font-medium text-gray-700">
                    Marks Achieved
                  </Label>
                  <Input
                    id="achievedMarks"
                    type="number"
                    value={achievedMarks}
                    onChange={(e) => setAchievedMarks(e.target.value)}
                    placeholder="85"
                    className="mt-1"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSave}
                className="w-full"
                disabled={!totalMarks || !achievedMarks}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Result
              </Button>
            </div>
          </div>

          {/* Previous Results */}
          {existingResults.length > 0 && (
            <div className="bg-white rounded-xl p-4 card-shadow animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-semibold text-gray-900 mb-4">Previous Results</h3>
              
              <div className="space-y-3">
                {existingResults.map((result, index) => {
                  const percentage = Math.round((result.achievedMarks / result.totalMarks) * 100);
                  const config = getTypeConfig(result.type);
                  
                  return (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.color}`}>
                          <span className="text-sm">{config.icon}</span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900 capitalize">
                              {result.type}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              percentage >= 80 ? 'bg-green-100 text-green-700' :
                              percentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {percentage}%
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(result.date)}</span>
                            <span>•</span>
                            <span>{result.achievedMarks}/{result.totalMarks}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Trophy className={`w-4 h-4 ${
                          percentage >= 80 ? 'text-green-500' :
                          percentage >= 60 ? 'text-yellow-500' :
                          'text-gray-400'
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultEntry;