import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/contexts/ProgressContext";
import { RewardSystem } from "./RewardSystem";

interface PositionOption {
  id: number;
  label: string;
  correct: boolean;
  position: string;
}

const questions = [
  {
    question: "أين المربع الأخضر؟",
    description: "اختر الموضع الصحيح",
    targetShape: "square",
    targetColor: "bg-green-500",
    positions: [
      { id: 1, label: "أعلى اليسار", correct: true, position: "top-left" },
      { id: 2, label: "أعلى اليمين", correct: false, position: "top-right" },
      { id: 3, label: "أسفل اليسار", correct: false, position: "bottom-left" },
      { id: 4, label: "أسفل اليمين", correct: false, position: "bottom-right" },
    ],
  },
  {
    question: "أين المثلث الأحمر؟",
    description: "اختر الموضع الصحيح",
    targetShape: "triangle",
    targetColor: "bg-red-500",
    positions: [
      { id: 1, label: "أعلى اليسار", correct: false, position: "top-left" },
      { id: 2, label: "أعلى اليمين", correct: false, position: "top-right" },
      { id: 3, label: "أسفل اليسار", correct: false, position: "bottom-left" },
      { id: 4, label: "أسفل اليمين", correct: true, position: "bottom-right" },
    ],
  },
  {
    question: "أين الدائرة الزرقاء؟",
    description: "اختر الموضع الصحيح",
    targetShape: "circle",
    targetColor: "bg-blue-500",
    positions: [
      { id: 1, label: "أعلى اليسار", correct: false, position: "top-left" },
      { id: 2, label: "أعلى اليمين", correct: true, position: "top-right" },
      { id: 3, label: "أسفل اليسار", correct: false, position: "bottom-left" },
      { id: 4, label: "أسفل اليمين", correct: false, position: "bottom-right" },
    ],
  },
];

export function SpatialActivity({ onComplete }: { onComplete?: () => void }) {
  const { updateModuleProgress } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showReward, setShowReward] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (option: PositionOption) => {
    if (answered) return;
    setSelectedId(option.id);
    setAnswered(true);
    if (option.correct) setCorrectAnswers(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setAnswered(false);
      setSelectedId(null);
    } else {
      updateModuleProgress('spatial', correctAnswers * 10);
      setShowReward(true);
    }
  };

  const renderTarget = (shape: string, color: string) => {
    switch (shape) {
      case "square": return <div className={`w-12 h-12 ${color} rounded-lg`} />;
      case "circle": return <div className={`w-12 h-12 ${color} rounded-full`} />;
      case "triangle": return (
        <div className="w-0 h-0" style={{
          borderLeft: "25px solid transparent",
          borderRight: "25px solid transparent",
          borderBottom: `45px solid ${color.includes('red') ? '#ef4444' : color.includes('green') ? '#22c55e' : '#3b82f6'}`
        }} />
      );
      default: return null;
    }
  };

  if (showReward) {
    return (
      <RewardSystem
        isVisible={true}
        starsEarned={Math.ceil((correctAnswers / questions.length) * 3)}
        message={`رائع! أجبت على ${correctAnswers} من ${questions.length} بشكل صحيح!`}
        onComplete={() => {
          setShowReward(false);
          onComplete?.();
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="p-8 bg-white rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#0d1b2a] mb-2 text-center">{question.question}</h2>
        <p className="text-gray-500 text-center mb-8">{question.description}</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {question.positions.map((pos) => (
            <button
              key={pos.id}
              onClick={() => handleAnswer(pos)}
              disabled={answered}
              className={`p-6 border-2 rounded-2xl transition-all ${
                answered 
                  ? pos.correct 
                    ? "border-green-500 bg-green-50" 
                    : selectedId === pos.id 
                      ? "border-red-500 bg-red-50" 
                      : "border-gray-200"
                  : "border-yellow-300 hover:border-yellow-500 hover:bg-yellow-50"
              }`}
            >
              <div className="w-24 h-24 bg-gray-50 rounded-lg mx-auto mb-3 relative flex items-center justify-center border border-gray-100">
                {/* Visual hint for position */}
                <div className={`absolute w-6 h-6 rounded-sm ${pos.correct ? question.targetColor : 'bg-gray-200'} ${
                  pos.position === 'top-left' ? 'top-1 left-1' :
                  pos.position === 'top-right' ? 'top-1 right-1' :
                  pos.position === 'bottom-left' ? 'bottom-1 left-1' : 'bottom-1 right-1'
                }`} />
              </div>
              <p className="font-semibold text-[#0d1b2a]">{pos.label}</p>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-sm text-gray-500">التقدم</p>
            <p className="text-xl font-bold text-[#4dd9e0]">{currentQuestion + 1}/{questions.length}</p>
          </div>
          {answered && (
            <Button onClick={handleNext} className="bg-[#4dd9e0] hover:bg-[#3bc8cf] text-[#0d1b2a] font-bold px-8 py-3 rounded-full">
              {currentQuestion === questions.length - 1 ? "النتيجة" : "التالي"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
