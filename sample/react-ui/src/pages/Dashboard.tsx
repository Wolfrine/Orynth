
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Award, AlertCircle, Wifi, Home, BarChart3, User } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: "English", progress: 85, color: "bg-indigo-500" },
    { name: "Chemistry", progress: 72, color: "bg-green-500" },
    { name: "Mathematics", progress: 68, color: "bg-blue-500" },
    { name: "Social Science", progress: 56, color: "bg-yellow-500" },
    { name: "Physics", progress: 45, color: "bg-purple-500" },
    { name: "Biology", progress: 38, color: "bg-red-500" },
  ];

  const overallProgress = Math.round(subjects.reduce((acc, sub) => acc + sub.progress, 0) / subjects.length);
  const weakestSubject = subjects.reduce((min, subject) => subject.progress < min.progress ? subject : min);

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return "bg-success";
    if (progress >= 40) return "bg-warning";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate("/subjects")}
            className="p-2 hover:bg-gray-100 rounded-full tap-highlight"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-1 bg-success-light px-2 py-1 rounded-full">
            <Wifi className="w-3 h-3 text-success" />
            <span className="text-xs text-success font-medium">Offline</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-8">
        <div className="max-w-sm mx-auto">
          {/* Anonymous User Warning */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 mb-6 animate-fade-in">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-orange-900 mb-1">Secure Your Progress</h4>
                <p className="text-sm text-orange-700 mb-3">
                  You're using a guest account. Sign in to save your progress permanently and access it from any device.
                </p>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Sign In Now
                </button>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-xl p-6 card-shadow mb-6 text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-primary"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${overallProgress}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{overallProgress}%</span>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Overall Progress</h2>
            <p className="text-gray-600">
              You've completed {overallProgress}% of your curriculum across all subjects
            </p>
          </div>

          {/* Subject Progress */}
          <div className="bg-white rounded-xl p-4 card-shadow mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-semibold text-gray-900 mb-4">Subject Progress</h3>
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={subject.name} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 ${subject.color} rounded-lg flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">{subject.name}</span>
                      <span className="text-sm text-gray-600">{subject.progress}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getProgressColor(subject.progress)}`}
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 card-shadow animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-warning-light rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Focus Area</h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{weakestSubject.name}</span> needs attention. 
                    Consider spending more time on this subject.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 card-shadow animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-success-light rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Great Progress!</h4>
                  <p className="text-sm text-gray-600">
                    You're doing excellent in <span className="font-medium">English</span>. 
                    Keep up the good work!
                  </p>
                </div>
              </div>
            </div>
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
          <button className="flex flex-col items-center space-y-1 tap-highlight">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="text-xs text-primary">Dashboard</span>
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

export default Dashboard;
