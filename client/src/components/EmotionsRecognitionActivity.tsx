import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RewardSystem } from "./RewardSystem";

interface Emotion {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

const emotions: Emotion[] = [
  { id: "happy", name: "سعيد", emoji: "😊", description: "وجه مبتسم" },
  { id: "sad", name: "حزين", emoji: "😢", description: "وجه باكي" },
  { id: "angry", name: "غاضب", emoji: "😠", description: "وجه غاضب" },
  { id: "surprised", name: "متفاجئ", emoji: "😮", description: "وجه متفاجئ" },
  { id: "calm", name: "هادئ", emoji: "😌", description: "وجه هادئ" },
];

interface EmotionsRecognitionActivityProps {
  childId?: number;
  onComplete?: (correctAnswers: number, totalQuestions: number) => void;
}

export function EmotionsRecognitionActivity({
  childId,
  onComplete,
}: EmotionsRecognitionActivityProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    { question: "أي وجه يعبر عن السعادة؟", correctId: "happy" },
    { question: "أي وجه يعبر عن الحزن؟", correctId: "sad" },
    { question: "أي وجه يعبر عن الغضب؟", correctId: "angry" },
    { question: "أي وجه يعبر عن المفاجأة؟", correctId: "surprised" },
    { question: "أي وجه يعبر عن الهدوء؟", correctId: "calm" },
  ];

  const currentQ = questions[currentQuestion];
  
  // Ensure correct answer is always included
  const correctEmotion = emotions.find((e) => e.id === currentQ.correctId)!;
  const otherEmotions = emotions.filter((e) => e.id !== currentQ.correctId);
  const randomOthers = otherEmotions
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  const emotionOptions = [correctEmotion, ...randomOthers].sort(
    () => Math.random() - 0.5
  );

  const handleAnswer = (emotionId: string) => {
    if (answered) return;

    setSelectedAnswer(emotionId);
    setAnswered(true);

    if (emotionId === currentQ.correctId) {
      setCorrectAnswers((prev) => prev + 1);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        // Activity complete
        setShowReward(true);
      }
    }, 1500);
  };

  const handleRewardComplete = () => {
    setShowReward(false);
    onComplete?.(correctAnswers, questions.length);
  };

  if (showReward) {
    return (
      <RewardSystem
        isVisible={true}
        starsEarned={Math.ceil((correctAnswers / questions.length) * 3)}
        message={`أحسنت! لقد أجبت على ${correctAnswers} من أصل ${questions.length} بشكل صحيح!`}
        onComplete={handleRewardComplete}
      />
    );
  }

  return (
    <div dir="rtl" className="min-h-[600px] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8 text-center">
          <p className="text-xl font-bold text-gray-500 mb-4">
            السؤال {currentQuestion + 1} من {questions.length}
          </p>
          <div className="flex gap-2 justify-center">
            {Array.from({ length: questions.length }).map((_, i) => (
              <div
                key={i}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i < currentQuestion
                    ? "bg-[#4dd9e0] w-10"
                    : i === currentQuestion
                      ? "bg-[#7c3aed] w-10"
                      : "bg-gray-200 w-8"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-[#4dd9e0]/20 mb-8 text-center">
          <h2 className="text-3xl font-black text-[#0d1b2a] mb-10">
            {currentQ.question}
          </h2>

          {/* Emotion Options */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            {emotionOptions.map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => handleAnswer(emotion.id)}
                disabled={answered}
                className={`
                  relative p-8 rounded-3xl transition-all duration-300 shadow-sm
                  ${
                    selectedAnswer === emotion.id
                      ? emotion.id === currentQ.correctId
                        ? "bg-green-100 ring-4 ring-green-500 scale-105"
                        : "bg-red-100 ring-4 ring-red-400 scale-95"
                      : "bg-gray-50 hover:bg-white hover:shadow-md"
                  }
                  ${answered ? "cursor-not-allowed" : "cursor-pointer hover:scale-105"}
                  disabled:opacity-75
                `}
              >
                <div className="text-7xl mb-4">{emotion.emoji}</div>
                <p className="text-lg font-black text-[#0d1b2a]">
                  {emotion.name}
                </p>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {answered && (
            <div
              className={`
                text-xl font-black p-6 rounded-2xl shadow-inner animate-in fade-in zoom-in duration-300
                ${
                  selectedAnswer === currentQ.correctId
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {selectedAnswer === currentQ.correctId
                ? "إجابة صحيحة! عمل رائع! 🌟"
                : "حاول مرة أخرى في المرة القادمة! 😊"}
            </div>
          )}
        </div>

        {/* Skip Button */}
        {!answered && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => handleAnswer("")}
              className="px-10 py-6 rounded-2xl font-black text-lg border-2 hover:bg-gray-50"
            >
              تخطي
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
