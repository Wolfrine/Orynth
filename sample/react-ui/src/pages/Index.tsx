
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 animate-fade-in">
          LearnTrack
        </h1>
        <p className="text-sm text-gray-600 animate-fade-in">
          Track your learning. Build confidence.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-20">
        <div className="max-w-sm mx-auto w-full">
          {/* Welcome Message */}
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Welcome to your learning journey
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Track your progress, master every chapter, and build lasting confidence in your studies.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-12">
            <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-10 h-10 bg-success-light rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Track Progress</p>
                <p className="text-sm text-gray-600">Monitor your learning across all subjects</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-10 h-10 bg-warning-light rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Build Confidence</p>
                <p className="text-sm text-gray-600">Rate your understanding of each topic</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={() => navigate("/board-selection")}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl card-shadow hover:card-shadow-hover tap-highlight"
            >
              Start Tracking
            </Button>
          </div>

          {/* Powered by Growth Tutorials */}
          <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-xs text-gray-500">Powered by Growth Tutorials</p>
          </div>
        </div>
      </div>

      {/* Background Illustration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
