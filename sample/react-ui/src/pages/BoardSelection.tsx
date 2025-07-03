
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const BoardSelection = () => {
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);

  const boards = [
    { id: "cbse", name: "CBSE", description: "Central Board of Secondary Education" },
    { id: "icse", name: "ICSE", description: "Indian Certificate of Secondary Education" },
    { id: "state", name: "State Board", description: "State Government Board" },
  ];

  const classes = ["6", "7", "8", "9", "10", "11", "12"];

  const handleContinue = () => {
    if (step === 1 && selectedBoard) {
      setStep(2);
    } else if (step === 2 && selectedClass) {
      localStorage.setItem("userBoard", selectedBoard);
      localStorage.setItem("userClass", selectedClass);
      navigate("/subjects");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => step === 1 ? navigate("/") : setStep(1)}
          className="p-2 hover:bg-white/20 rounded-full tap-highlight"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex space-x-2">
          <div className={`w-8 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-gray-300'}`} />
          <div className={`w-8 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`} />
        </div>
      </div>

      <div className="flex-1 px-6 pt-8">
        <div className="max-w-sm mx-auto">
          {step === 1 ? (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Select Your Board
              </h1>
              <p className="text-gray-600 mb-8">
                Choose your education board to get started
              </p>

              <div className="space-y-4">
                {boards.map((board) => (
                  <button
                    key={board.id}
                    onClick={() => setSelectedBoard(board.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all tap-highlight ${
                      selectedBoard === board.id
                        ? 'bg-primary text-white card-shadow-hover'
                        : 'bg-white card-shadow hover:card-shadow-hover'
                    }`}
                  >
                    <h3 className="font-semibold text-lg">{board.name}</h3>
                    <p className={`text-sm ${
                      selectedBoard === board.id ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      {board.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Select Your Class
              </h1>
              <p className="text-gray-600 mb-8">
                Choose your current class level
              </p>

              <div className="grid grid-cols-3 gap-4">
                {classes.map((classNum) => (
                  <button
                    key={classNum}
                    onClick={() => setSelectedClass(classNum)}
                    className={`aspect-square rounded-xl font-semibold text-lg transition-all tap-highlight ${
                      selectedClass === classNum
                        ? 'bg-primary text-white card-shadow-hover'
                        : 'bg-white card-shadow hover:card-shadow-hover text-gray-900'
                    }`}
                  >
                    Class {classNum}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-6">
        <Button
          onClick={handleContinue}
          disabled={step === 1 ? !selectedBoard : !selectedClass}
          className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl card-shadow hover:card-shadow-hover tap-highlight disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === 2 ? "Start Learning" : "Continue"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BoardSelection;
