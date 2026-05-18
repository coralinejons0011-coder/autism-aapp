import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { RewardSystem } from "@/components/RewardSystem";

const questions = [
  { prompt: "هذه دائرة كبيرة 🔵 - أي من هذه أيضاً دائرة؟", options: [
    { emoji: "🔴", label: "دائرة حمراء", correct: true },
    { emoji: "🟥", label: "مربع أحمر", correct: false },
    { emoji: "🔺", label: "مثلث أحمر", correct: false },
  ]},
  { prompt: "هذا مثلث صغير 🔺 - أي من هذه أيضاً مثلث؟", options: [
    { emoji: "🟦", label: "مربع أزرق", correct: false },
    { emoji: "🔻", label: "مثلث أكبر", correct: true },
    { emoji: "⭕", label: "دائرة", correct: false },
  ]},
  { prompt: "هذا مربع أصفر 🟨 - أي من هذه أيضاً مربع؟", options: [
    { emoji: "🟩", label: "مربع أخضر", correct: true },
    { emoji: "🔵", label: "دائرة زرقاء", correct: false },
    { emoji: "🔺", label: "مثلث", correct: false },
  ]},
  { prompt: "هذه نجمة كبيرة ⭐ - أي من هذه أيضاً نجمة؟", options: [
    { emoji: "🌟", label: "نجمة لامعة", correct: true },
    { emoji: "🌙", label: "قمر", correct: false },
    { emoji: "☀️", label: "شمس", correct: false },
  ]},
];

export default function FormConstancyPage() {
  const [, setLocation] = useLocation();
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const q = questions[current];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx); setAnswered(true);
    if (q.options[idx].correct) setCorrect(c => c + 1);
    setTimeout(() => {
      if (current < questions.length - 1) { setCurrent(c => c + 1); setSelected(null); setAnswered(false); }
      else setShowReward(true);
    }, 1800);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      <RewardSystem isVisible={showReward} starsEarned={Math.ceil((correct/questions.length)*3)}
        message={`أحسنت! أجبت على ${correct} من ${questions.length}!`}
        onComplete={() => { setShowReward(false); setLocation("/"); }} />
      <div className="bg-white shadow-sm border-b border-[#84cc16]/30 px-4 py-4">
        <div className="container max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/")}><ArrowRight size={20} className="ml-2" /> رجوع</Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔺</span>
            <div><h1 className="text-xl font-bold text-[#0d1b2a]">الثبات الشكلي</h1>
            <p className="text-sm text-gray-500">المحور الثامن - تعرف على الأشكال بأحجام وألوان مختلفة</p></div>
          </div>
        </div>
      </div>
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between">
          <span className="text-gray-500">السؤال {current + 1} من {questions.length}</span>
          <span className="text-[#84cc16] font-bold">✅ {correct} صحيح</span>
        </div>
        <Card className="p-8 text-center mb-6 bg-white shadow-lg">
          <p className="text-2xl font-bold text-[#0d1b2a] mb-8">{q.prompt}</p>
          <div className="grid grid-cols-3 gap-4">
            {q.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  answered ? opt.correct ? "bg-green-100 border-2 border-green-500 scale-105" :
                  idx === selected ? "bg-red-100 border-2 border-red-400" : "bg-gray-100 opacity-50"
                  : "bg-[#84cc16]/10 hover:bg-[#84cc16]/20 border-2 border-transparent hover:border-[#84cc16] cursor-pointer hover:scale-105"
                }`}>
                <div className="text-6xl mb-2">{opt.emoji}</div>
                <p className="text-sm font-bold text-gray-700">{opt.label}</p>
              </button>
            ))}
          </div>
          {answered && <div className={`mt-6 p-4 rounded-xl text-lg font-bold ${q.options[selected!]?.correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {q.options[selected!]?.correct ? "أحسنت! 🌟" : `الإجابة الصحيحة: ${q.options.find(o => o.correct)?.label} 😊`}
          </div>}
        </Card>
      </div>
    </div>
  );
}
