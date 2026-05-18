import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ShapeOption {
  id: string;
  label: string;
  shape: "square" | "circle" | "triangle";
  color: string;
  emoji: string;
}

const questions = [
  {
    question: "ابحث عن المربع الأخضر",
    target: "square-green",
    options: [
      { id: "square-green", label: "المربع الأخضر", shape: "square", color: "bg-green-500", emoji: "🟩" },
      { id: "circle-blue", label: "الدائرة الزرقاء", shape: "circle", color: "bg-blue-500", emoji: "🔵" },
      { id: "triangle-yellow", label: "المثلث الأصفر", shape: "triangle", color: "bg-yellow-500", emoji: "🟨" },
    ],
  },
  {
    question: "ابحث عن المثلث الأحمر",
    target: "triangle-red",
    options: [
      { id: "square-purple", label: "المربع البنفسجي", shape: "square", color: "bg-purple-500", emoji: "🟪" },
      { id: "triangle-red", label: "المثلث الأحمر", shape: "triangle", color: "bg-red-500", emoji: "🔺" },
      { id: "circle-orange", label: "الدائرة البرتقالية", shape: "circle", color: "bg-orange-500", emoji: "🟠" },
    ],
  },
  {
    question: "ابحث عن الدائرة الزرقاء",
    target: "circle-blue",
    options: [
      { id: "circle-blue", label: "الدائرة الزرقاء", shape: "circle", color: "bg-blue-500", emoji: "🔵" },
      { id: "square-red", label: "المربع الأحمر", shape: "square", color: "bg-red-500", emoji: "🟥" },
      { id: "triangle-green", label: "المثلث الأخضر", shape: "triangle", color: "bg-green-500", emoji: "🟩" },
    ],
  },
  {
    question: "ابحث عن المربع الأزرق",
    target: "square-blue",
    options: [
      { id: "square-blue", label: "المربع الأزرق", shape: "square", color: "bg-blue-500", emoji: "🟦" },
      { id: "circle-red", label: "الدائرة الحمراء", shape: "circle", color: "bg-red-500", emoji: "🔴" },
      { id: "triangle-purple", label: "المثلث البنفسجي", shape: "triangle", color: "bg-purple-500", emoji: "🟪" },
    ],
  },
];

export function ShapeMatchingActivity() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.target;

  const handleAnswer = (optionId: string) => {
    if (!answered) {
      setSelectedAnswer(optionId);
      setAnswered(true);
      if (optionId === question.target) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const renderShape = (option: ShapeOption) => {
    switch (option.shape) {
      case "square":
        return (
          <div className={`w-20 h-20 ${option.color} rounded-lg shadow-lg`} />
        );
      case "circle":
        return (
          <div className={`w-20 h-20 ${option.color} rounded-full shadow-lg`} />
        );
      case "triangle":
        return (
          <div
            className={`w-0 h-0 border-l-10 border-r-10 border-b-20 shadow-lg`}
            style={{
              borderLeft: "40px solid transparent",
              borderRight: "40px solid transparent",
              borderBottom: `70px solid ${option.color}`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#0d1b2a] mb-4">{question.question}</h2>
          <div className="flex justify-center gap-2 mb-4">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i <= currentQuestion ? "bg-[#4dd9e0]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-500">السؤال {currentQuestion + 1} من {questions.length}</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              disabled={answered}
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                answered
                  ? option.id === question.target
                    ? "border-green-500 bg-green-50"
                    : selectedAnswer === option.id
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                  : "border-yellow-300 hover:border-yellow-500 hover:bg-yellow-50"
              }`}
            >
              {renderShape(option)}
              <span className="text-sm font-semibold text-[#0d1b2a]">{option.label}</span>
            </button>
          ))}
        </div>

        {answered && (
          <div className={`text-center mb-6 p-4 rounded-xl ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
            <p className={`text-lg font-bold ${isCorrect ? "text-green-700" : "text-red-700"}`}>
              {isCorrect ? "✅ ممتاز! إجابة صحيحة!" : "❌ حاول مرة أخرى!"}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-sm text-gray-500">النقاط</p>
            <p className="text-2xl font-bold text-[#4dd9e0]">{score}/{questions.length}</p>
          </div>
          {answered && (
            <Button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
              className="bg-[#4dd9e0] hover:bg-[#3bc8cf] text-[#0d1b2a] font-bold px-8 py-3 rounded-full"
            >
              {currentQuestion === questions.length - 1 ? "انتهى" : "التالي →"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
