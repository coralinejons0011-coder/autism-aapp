import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function SpatialPage() {
  const [, setLocation] = useLocation();
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      question: "أين المربع الأخضر؟",
      description: "اختر الموضع الصحيح",
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
      positions: [
        { id: 1, label: "أعلى اليسار", correct: false, position: "top-left" },
        { id: 2, label: "أعلى اليمين", correct: false, position: "top-right" },
        { id: 3, label: "أسفل اليسار", correct: false, position: "bottom-left" },
        { id: 4, label: "أسفل اليمين", correct: true, position: "bottom-right" },
      ],
    },
  ];

  const question = questions[currentQuestion];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      <div className="bg-white shadow-sm border-b border-[#4dd9e0]/30 px-4 py-4">
        <div className="container max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🗺️</span>
            <h1 className="text-xl font-bold text-[#0d1b2a]">التنظيم المكاني</h1>
          </div>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Card className="p-8 bg-white rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#0d1b2a] mb-2 text-center">{question.question}</h2>
          <p className="text-gray-500 text-center mb-8">{question.description}</p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {question.positions.map((pos) => (
              <button
                key={pos.id}
                onClick={() => handleAnswer(pos.correct)}
                className="p-6 border-2 border-yellow-300 rounded-2xl hover:bg-yellow-50 transition-all"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#4dd9e0]/20 to-[#7c3aed]/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-500 rounded-lg"></div>
                </div>
                <p className="font-semibold text-[#0d1b2a]">{pos.label}</p>
              </button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg font-bold text-[#4dd9e0]">النقاط: {score}/{questions.length}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
