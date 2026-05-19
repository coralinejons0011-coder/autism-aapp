import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/contexts/ProgressContext";
import { RewardSystem } from "./RewardSystem";

const levels = [
  {
    image: "🐱",
    parts: ["👂", "👀", "❓"],
    options: ["👃", "🚗", "🌳"],
    answer: "👃",
    hint: "ما الجزء الناقص لتكمل وجه القطة؟"
  },
  {
    image: "🚗",
    parts: ["🚪", "🪟", "❓"],
    options: ["🎡", "🏠", "🍎"],
    answer: "🎡",
    hint: "ماذا ينقص السيارة لتتحرك؟"
  },
  {
    image: "🏠",
    parts: ["🧱", "🚪", "❓"],
    options: ["🪟", "🍦", "🐶"],
    answer: "🪟",
    hint: "أكمل بناء المنزل"
  }
];

export function ClosureActivity({ onComplete }: { onComplete?: () => void }) {
  const { updateModuleProgress } = useProgress();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);

  const level = levels[currentLevel];

  const handleAnswer = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === level.answer) setCorrectCount(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      updateModuleProgress('closure', correctCount * 15);
      setShowReward(true);
    }
  };

  if (showReward) {
    return (
      <RewardSystem
        isVisible={true}
        starsEarned={Math.ceil((correctCount / levels.length) * 3)}
        message={`أحسنت! أكملت ${correctCount} أشكال بنجاح!`}
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
        <h2 className="text-2xl font-bold text-[#0d1b2a] mb-8 text-center">{level.hint}</h2>
        
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="text-8xl p-6 bg-pink-50 rounded-full border-4 border-pink-200">{level.image}</div>
          <div className="flex gap-4 items-center">
            {level.parts.map((p, i) => (
              <div key={i} className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${p === '❓' ? 'bg-pink-100 border-2 border-dashed border-pink-400 text-pink-500 font-bold' : 'bg-white border-2 border-gray-100 shadow-sm'}`}>
                {p === '❓' && answered ? level.answer : p}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {level.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={answered}
              className={`p-6 rounded-2xl text-5xl transition-all ${
                answered 
                  ? opt === level.answer 
                    ? "bg-green-100 border-2 border-green-500 scale-105" 
                    : selected === opt 
                      ? "bg-red-100 border-2 border-red-400" 
                      : "bg-gray-50 opacity-50"
                  : "bg-white border-2 border-[#ec4899]/30 hover:border-[#ec4899] hover:bg-[#ec4899]/5 cursor-pointer hover:scale-105"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-sm text-gray-500">المستوى</p>
            <p className="text-xl font-bold text-[#ec4899]">{currentLevel + 1}/{levels.length}</p>
          </div>
          {answered && (
            <Button onClick={handleNext} className="bg-[#ec4899] hover:bg-[#db2777] text-white font-bold px-8 py-3 rounded-full">
              {currentLevel === levels.length - 1 ? "النتيجة" : "التالي"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
