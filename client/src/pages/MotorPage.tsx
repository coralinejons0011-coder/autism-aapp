import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { RewardSystem } from "@/components/RewardSystem";

const items = [
  { id: "apple", emoji: "🍎", label: "تفاحة", target: "فاكهة" },
  { id: "dog", emoji: "🐶", label: "كلب", target: "حيوان" },
  { id: "car", emoji: "🚗", label: "سيارة", target: "مركبة" },
  { id: "banana", emoji: "🍌", label: "موزة", target: "فاكهة" },
  { id: "cat", emoji: "🐱", label: "قطة", target: "حيوان" },
  { id: "bus", emoji: "🚌", label: "حافلة", target: "مركبة" },
];

const targets = ["فاكهة", "حيوان", "مركبة"];

export default function MotorPage() {
  const [, setLocation] = useLocation();
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);

  const handleDrop = (target: string) => {
    if (!dragging) return;
    setPlaced(prev => ({ ...prev, [dragging]: target }));
    setDragging(null);
    const newPlaced = { ...placed, [dragging]: target };
    if (Object.keys(newPlaced).length === items.length) {
      setTimeout(() => setShowReward(true), 500);
    }
  };

  const correctCount = Object.entries(placed).filter(([id, t]) => items.find(i => i.id === id)?.target === t).length;

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      <RewardSystem isVisible={showReward} starsEarned={Math.ceil((correctCount/items.length)*3)}
        message={`أحسنت! وضعت ${correctCount} من ${items.length} في المكان الصحيح!`}
        onComplete={() => { setShowReward(false); setLocation("/"); }} />
      <div className="bg-white shadow-sm border-b border-[#f97316]/30 px-4 py-4">
        <div className="container max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/")}><ArrowRight size={20} className="ml-2" /> رجوع</Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <div><h1 className="text-xl font-bold text-[#0d1b2a]">التناسق البصري الحركي</h1>
            <p className="text-sm text-gray-500">المحور السادس - اسحب وأفلت في المكان الصحيح</p></div>
          </div>
        </div>
      </div>
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600 mb-6 text-lg">اسحب كل عنصر إلى المجموعة الصحيحة</p>

        {/* Items to drag */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {items.filter(item => !placed[item.id]).map(item => (
            <div key={item.id} draggable
              onDragStart={() => setDragging(item.id)}
              className="bg-white border-2 border-[#f97316] rounded-2xl p-4 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all text-center min-w-[90px]">
              <div className="text-4xl mb-1">{item.emoji}</div>
              <p className="text-sm font-bold text-[#0d1b2a]">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Drop targets */}
        <div className="grid grid-cols-3 gap-4">
          {targets.map(target => (
            <div key={target}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(target)}
              className="min-h-[160px] border-2 border-dashed border-[#f97316]/50 rounded-2xl p-3 bg-[#f97316]/5">
              <p className="text-center font-bold text-[#f97316] mb-3 text-lg">{target}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {items.filter(item => placed[item.id] === target).map(item => {
                  const isCorrect = item.target === target;
                  return (
                    <div key={item.id} className={`rounded-xl p-2 text-center ${isCorrect ? "bg-green-100 border border-green-400" : "bg-red-100 border border-red-400"}`}>
                      <div className="text-3xl">{item.emoji}</div>
                      <p className="text-xs font-bold">{isCorrect ? "✅" : "❌"}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white" onClick={() => { setPlaced({}); setDragging(null); }}>
            إعادة المحاولة 🔄
          </Button>
        </div>
      </div>
    </div>
  );
}
