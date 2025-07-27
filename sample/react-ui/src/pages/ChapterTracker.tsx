import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Home, BarChart3, User, Plus, Trophy } from "lucide-react";

type Status = "pending" | "in-progress" | "done";
type Confidence = "low" | "medium" | "high";

interface Result {
  id: string;
  type: "practice" | "test" | "exam";
  totalMarks: number;
  achievedMarks: number;
  date: string;
}

interface Chapter {
  id: string;
  name: string;
  status: Status;
  confidence: Confidence;
  results: Result[];
}

const ChapterTracker = () => {
  const navigate = useNavigate();
  const { subject } = useParams();
  
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: "1", name: "Number Systems", status: "done", confidence: "high", results: [
      { id: "r1", type: "test", totalMarks: 100, achievedMarks: 85, date: "2024-01-15" }
    ]},
    { id: "2", name: "Polynomials", status: "done", confidence: "medium", results: [
      { id: "r2", type: "practice", totalMarks: 50, achievedMarks: 38, date: "2024-01-10" }
    ]},
    { id: "3", name: "Coordinate Geometry", status: "in-progress", confidence: "medium", results: [] },
    { id: "4", name: "Linear Equations", status: "in-progress", confidence: "low", results: [] },
    { id: "5", name: "Introduction to Euclid's Geometry", status: "pending", confidence: "low", results: [] },
    { id: "6", name: "Lines and Angles", status: "pending", confidence: "low", results: [] },
    { id: "7", name: "Triangles", status: "pending", confidence: "low", results: [] },
    { id: "8", name: "Quadrilaterals", status: "pending", confidence: "low", results: [] },
  ]);

  const subjectName = subject?.replace("-", " ").toUpperCase() || "SUBJECT";

  const getStatusConfig = (status: Status) => {
    switch (status) {
      case "done":
        return { text: "Done", color: "bg-success text-white", lightColor: "bg-success-light text-success" };
      case "in-progress":
        return { text: "In Progress", color: "bg-warning text-white", lightColor: "bg-warning-light text-warning" };
      case "pending":
        return { text: "Pending", color: "bg-pending text-white", lightColor: "bg-pending-light text-pending" };
    }
  };

  const getConfidenceConfig = (confidence: Confidence) => {
    switch (confidence) {
      case "high":
        return { text: "High", color: "bg-success text-white", lightColor: "bg-success-light text-success" };
      case "medium":
        return { text: "Medium", color: "bg-warning text-white", lightColor: "bg-warning-light text-warning" };
      case "low":
        return { text: "Low", color: "bg-red-500 text-white", lightColor: "bg-red-50 text-red-500" };
    }
  };

  const cycleStatus = (chapterId: string) => {
    setChapters(prev => prev.map(chapter => {
      if (chapter.id === chapterId) {
        const statusCycle: Status[] = ["pending", "in-progress", "done"];
        const currentIndex = statusCycle.indexOf(chapter.status);
        const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
        return { ...chapter, status: nextStatus };
      }
      return chapter;
    }));
  };

  const cycleConfidence = (chapterId: string) => {
    setChapters(prev => prev.map(chapter => {
      if (chapter.id === chapterId) {
        const confidenceCycle: Confidence[] = ["low", "medium", "high"];
        const currentIndex = confidenceCycle.indexOf(chapter.confidence);
        const nextConfidence = confidenceCycle[(currentIndex + 1) % confidenceCycle.length];
        return { ...chapter, confidence: nextConfidence };
      }
      return chapter;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Sticky Header */}
      <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate("/subjects")}
            className="p-2 hover:bg-gray-100 rounded-full tap-highlight"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">{subjectName}</h1>
            <p className="text-sm text-gray-600">Track your progress</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-8">
        <div className="max-w-sm mx-auto">
          {/* Progress Summary */}
          <div className="bg-white rounded-xl p-4 card-shadow mb-6 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900">Progress Summary</h3>
              <span className="text-sm text-gray-600">
                {chapters.filter(c => c.status === "done").length}/{chapters.length} Complete
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all"
                style={{ width: `${(chapters.filter(c => c.status === "done").length / chapters.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Chapter List */}
          <div className="space-y-3">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="bg-white rounded-xl p-4 card-shadow hover:card-shadow-hover transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {chapter.name}
                    </h3>
                    {chapter.results.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-3 h-3 text-primary" />
                        <span className="text-xs text-gray-600">
                          {chapter.results.length} result{chapter.results.length !== 1 ? 's' : ''} • 
                          {chapter.results.length > 0 && ` ${Math.round(
                            chapter.results.reduce((sum, r) => sum + (r.achievedMarks / r.totalMarks * 100), 0) / chapter.results.length
                          )}% avg`}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => navigate(`/result-entry/${subject}/${chapter.id}`)}
                    className="w-8 h-8 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center tap-highlight transition-colors"
                  >
                    <Plus className="w-4 h-4 text-primary" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-xs text-gray-500 mb-1">Status</div>
                    <button
                      onClick={() => cycleStatus(chapter.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium tap-highlight transition-all ${
                        getStatusConfig(chapter.status).lightColor
                      }`}
                    >
                      {getStatusConfig(chapter.status).text}
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-xs text-gray-500 mb-1">Confidence</div>
                    <button
                      onClick={() => cycleConfidence(chapter.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium tap-highlight transition-all ${
                        getConfidenceConfig(chapter.confidence).lightColor
                      }`}
                    >
                      {getConfidenceConfig(chapter.confidence).text}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-gray-600 mb-4">
              Tap on status and confidence chips to update your progress
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <div className="flex justify-around items-center max-w-sm mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center space-y-1 tap-highlight"
          >
            <Home className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-600">Home</span>
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex flex-col items-center space-y-1 tap-highlight"
          >
            <BarChart3 className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-600">Dashboard</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center space-y-1 tap-highlight"
          >
            <User className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-600">Profile</span>
          </button>
        </div>
        
        {/* Powered by Growth Tutorials */}
        <div className="text-center pt-2 border-t border-gray-100 mt-3">
          <p className="text-xs text-gray-500">Powered by Growth Tutorials</p>
        </div>
      </div>
    </div>
  );
};

export default ChapterTracker;
