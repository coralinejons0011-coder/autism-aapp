import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { RewardSystem } from "@/components/RewardSystem";

const questions = [
  { prompt: "ابحث عن النجمة المخفية في الصورة", scene: ["🌟","🌿","🌿","🌿","🌿","🌿","🌿","🌿","🌿"], answer: "🌟", options: ["🌟","🌸","🍀"] },
  { prompt: "ابحث عن القطة المختبئة", scene: ["🌳","🌳","🐱","🌳","🌳","🌳","🌳","🌳","🌳"], answer: "🐱", options: ["🐶","🐱","🐸"] },
  { prompt: "ابحث عن التفاحة في الشجرة", scene: ["🍃","🍃","🍃","🍎","🍃","🍃","🍃","🍃","🍃"], answer: "🍎", options: ["🍊","🍋","🍎"] },
  { prompt: "ابحث عن الكرة في الملعب", scene: ["🏟️","🏟️","⚽","🏟️","🏟️","🏟️","🏟️","🏟️","🏟️"], answer: "⚽", options: ["🏀","⚽","🎾"] },
];

export default function FigureGroundPage() {
  const [, setLocation] = useLocation();
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const q = questions[current];

  const handleAnswer = (ans: string) => {
    if (answered) return;
    setSelected(ans); setAnswered(true);
    if (ans === q.answer) setCorrect(c => c + 1);
    setTimeout(() => {
      if (current < questions.length - 1) { setCurrent(c => c + 1); setSelected(null); setAnswered(false); }
      else setShowReward(true);
    }, 1800);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      <RewardSystem isVisible={showReward} starsEarned={Math.ceil((correct/questions.length)*3)}
        message={`أحسنت! وجدت ${correct} من ${questions.length}!`}
        onComplete={() => { setShowReward(false); setLocation("/"); }} />
      <div className="bg-white shadow-sm border-b border-[#06b6d4]/30 px-4 py-4">
        <div className="container max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/")}><ArrowRight size={20} className="ml-2" /> رجوع</Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔍</span>
            <div><h1 className="text-xl font-bold text-[#0d1b2a]">الشكل والخلفية</h1>
            <p className="text-sm text-gray-500">المحور السابع - ابحث عن الأشياء المخفية</p></div>
          </div>
        </div>
      </div>
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="mb-4 flex justify-between">
          <span className="text-gray-500">السؤال {current + 1} من {questions.length}</span>
          <span className="text-[#06b6d4] font-bold">✅ {correct} صحيح</span>
        </div>
        <Card className="p-8 text-center mb-6 bg-white shadow-lg">
          <p className="text-2xl font-bold text-[#0d1b2a] mb-6">{q.prompt}</p>
          <div className="grid grid-cols-3 gap-2 mb-6 bg-[#06b6d4]/5 p-4 rounded-2xl">
            {q.scene.map((item, i) => (
              <span key={i} className="text-4xl text-center">{item}</span>
            ))}
          </div>
          <p className="text-gray-500 mb-4">ما الشيء المختلف الذي رأيته؟</p>
          <div className="grid grid-cols-3 gap-4">
            {q.options.map(opt => (
              <button key={opt} onClick={() => handleAnswer(opt)} disabled={answered}
                className={`p-5 rounded-2xl text-5xl transition-all duration-300 ${
                  answered ? opt === q.answer ? "bg-green-100 border-2 border-green-500 scale-105" :
                  opt === selected ? "bg-red-100 border-2 border-red-400" : "bg-gray-100 opacity-50"
                  : "bg-[#06b6d4]/10 hover:bg-[#06b6d4]/20 border-2 border-transparent hover:border-[#06b6d4] cursor-pointer hover:scale-105"
                }`}>{opt}</button>
            ))}
          </div>
          {answered && <div className={`mt-6 p-4 rounded-xl text-lg font-bold ${selected === q.answer ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {selected === q.answer ? "أحسنت! وجدته! 🌟" : `الإجابة: ${q.answer} 😊`}
          </div>}
        </Card>
      </div>
    </div>
  );
}
