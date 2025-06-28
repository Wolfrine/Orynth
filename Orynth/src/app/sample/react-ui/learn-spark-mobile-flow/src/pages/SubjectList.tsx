
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Calculator, Atom, Globe, Users, Palette } from "lucide-react";

const SubjectList = () => {
  const navigate = useNavigate();

  const subjects = [
    { id: "mathematics", name: "Mathematics", icon: Calculator, progress: 68, color: "bg-blue-500" },
    { id: "physics", name: "Physics", icon: Atom, progress: 45, color: "bg-purple-500" },
    { id: "chemistry", name: "Chemistry", icon: BookOpen, progress: 72, color: "bg-green-500" },
    { id: "biology", name: "Biology", icon: Users, progress: 38, color: "bg-red-500" },
    { id: "english", name: "English", icon: BookOpen, progress: 85, color: "bg-indigo-500" },
    { id: "social-science", name: "Social Science", icon: Globe, progress: 56, color: "bg-yellow-500" },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "bg-success";
    if (progress >= 40) return "bg-warning";
    return "bg-pending";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate("/board-selection")}
            className="p-2 hover:bg-white/20 rounded-full tap-highlight"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">My Subjects</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-primary tap-highlight"
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-8">
        <div className="max-w-sm mx-auto">
          <div className="mb-6 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Choose a subject to continue
            </h2>
            <p className="text-gray-600">
              Track your progress and build confidence
            </p>
          </div>

          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <button
                key={subject.id}
                onClick={() => navigate(`/chapters/${subject.id}`)}
                className="w-full bg-white rounded-xl p-4 card-shadow hover:card-shadow-hover transition-all tap-highlight animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center`}>
                    <subject.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {subject.name}
                    </h3>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getProgressColor(subject.progress)}`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {subject.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 bg-white rounded-xl p-4 card-shadow animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">4</div>
                <div className="text-sm text-gray-600">Subjects Started</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">62%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
