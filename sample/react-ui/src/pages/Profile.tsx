import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, BarChart3, User } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [school, setSchool] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // Auto-fill board and standard from localStorage
  useEffect(() => {
    const userBoard = localStorage.getItem("userBoard");
    const userClass = localStorage.getItem("userClass");
    const userSchool = localStorage.getItem("userSchool");
    const userBirthDate = localStorage.getItem("userBirthDate");
    
    if (userBoard) setSelectedBoard(userBoard);
    if (userClass) setSelectedStandard(userClass);
    if (userSchool) setSchool(userSchool);
    if (userBirthDate) setBirthDate(userBirthDate);
  }, []);

  const handleUpdate = () => {
    // Save all profile data to localStorage
    localStorage.setItem("userBoard", selectedBoard);
    localStorage.setItem("userClass", selectedStandard);
    localStorage.setItem("userSchool", school);
    localStorage.setItem("userBirthDate", birthDate);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="text-center py-4">
          <h1 className="text-lg font-semibold text-gray-900">Your Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-8">
        <div className="max-w-sm mx-auto">
          {/* UID Display */}
          <div className="mb-6 bg-white rounded-xl p-4 card-shadow animate-fade-in">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">User ID</p>
              <p className="text-lg font-medium text-gray-900 font-mono">abc123xyz</p>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="mb-6 bg-white rounded-xl p-6 card-shadow animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="board" className="text-sm font-medium text-gray-900">
                  Board
                </Label>
                <Select value={selectedBoard} onValueChange={setSelectedBoard}>
                  <SelectTrigger className="w-full h-12 bg-gray-50 rounded-xl border-gray-200 mt-1">
                    <SelectValue placeholder="Choose your board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbse">CBSE</SelectItem>
                    <SelectItem value="icse">ICSE</SelectItem>
                    <SelectItem value="state">State</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="standard" className="text-sm font-medium text-gray-900">
                  Standard
                </Label>
                <Select value={selectedStandard} onValueChange={setSelectedStandard}>
                  <SelectTrigger className="w-full h-12 bg-gray-50 rounded-xl border-gray-200 mt-1">
                    <SelectValue placeholder="Choose your class" />
                  </SelectTrigger>
                  <SelectContent>
                    {[6, 7, 8, 9, 10, 11, 12].map((std) => (
                      <SelectItem key={std} value={std.toString()}>
                        Class {std}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="mb-6 bg-white rounded-xl p-6 card-shadow animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            <p className="text-sm text-gray-600 mb-4">Optional details to personalize your experience</p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="school" className="text-sm font-medium text-gray-900">
                  School Name
                </Label>
                <Input
                  id="school"
                  type="text"
                  placeholder="Enter your school name"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full h-12 bg-gray-50 rounded-xl border-gray-200 mt-1"
                />
              </div>

              <div>
                <Label htmlFor="birthDate" className="text-sm font-medium text-gray-900">
                  Birth Date
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full h-12 bg-gray-50 rounded-xl border-gray-200 mt-1"
                />
              </div>
            </div>
          </div>

          {/* Update Section - Prominent */}
          <div className="mb-6 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 card-shadow animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-lg font-semibold text-white mb-2">Save Changes</h2>
            <p className="text-white/80 text-sm mb-4">Update your profile information</p>
            <Button 
              onClick={handleUpdate}
              className="w-full h-12 text-lg font-semibold bg-white text-primary hover:bg-gray-50 rounded-xl shadow-lg"
            >
              Update Profile
            </Button>
          </div>

          {/* Upgrade Section */}
          <div className="mb-4 bg-white rounded-xl p-6 card-shadow animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Premium Features</h2>
            <p className="text-gray-600 text-sm mb-4">Unlock advanced tracking and analytics</p>
            <Button 
              disabled 
              className="w-full h-12 text-lg font-semibold rounded-xl opacity-50 cursor-not-allowed"
            >
              Upgrade Account
            </Button>
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
          <button className="flex flex-col items-center space-y-1 tap-highlight">
            <User className="w-6 h-6 text-primary" />
            <span className="text-xs text-primary font-medium">Profile</span>
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

export default Profile;
