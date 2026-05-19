import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/contexts/ProgressContext";
import { RewardSystem } from "./RewardSystem";

const levels = [
  {
    sequence: ["🔴", "🔵", "🔴"],
    options: ["🔵", "🔴", "🟢"],
    answer: "🔵",
    hint: "ما هو الشكل التالي في النمط؟"
  },
  {
    sequence: ["🍎", "🍌", "🍎", "🍌"],
    options: ["🍎", "🍌", "🍇"],
    answer: "🍎",
    hint: "اكمل النمط"
  },
  {
    sequence: ["🚗", "🚗", "🚌", "🚗", "🚗"],
    options: ["🚗", "🚌", "🚲"],
    answer: "🚌",
    hint: "ماذا يأتي بعد ذلك؟"
  }
];

export function SequenceActivity({ onComplete }: { onComplete?: () => void }) {
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
      updateModuleProgress('sequence', correctCount * 15);
      setShowReward(true);
    }
  };

  if (showReward) {
    return (
      <RewardSystem
        isVisible={true}
        starsEarned={Math.ceil((correctCount / levels.length) * 3)}
        message={`ممتاز! أكملت ${correctCount} أنماط صحيحة!`}
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
        
        <div className="flex justify-center items-center gap-4 mb-12 bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
          {level.sequence.map((item, i) => (
            <div key={i} className="text-5xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{item}</div>
          ))}
          <div className="w-16 h-16 border-4 border-[#10b981] border-dashed rounded-xl flex items-center justify-center text-3xl text-[#10b981] font-bold">?</div>
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
                  : "bg-white border-2 border-[#10b981]/30 hover:border-[#10b981] hover:bg-[#10b981]/5 cursor-pointer hover:scale-105"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-sm text-gray-500">المستوى</p>
            <p className="text-xl font-bold text-[#10b981]">{currentLevel + 1}/{levels.length}</p>
          </div>
          {answered && (
            <Button onClick={handleNext} className="bg-[#10b981] hover:bg-[#059669] text-white font-bold px-8 py-3 rounded-full">
              {currentLevel === levels.length - 1 ? "النتيجة" : "التالي"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
