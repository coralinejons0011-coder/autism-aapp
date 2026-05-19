import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RewardSystem } from "@/components/RewardSystem";
import { useProgress } from "@/contexts/ProgressContext";
import DashboardLayout from "@/components/DashboardLayout";

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
  const { updateModuleProgress } = useProgress();
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);

  const handleDrop = (target: string) => {
    if (!dragging) return;
    const newPlaced = { ...placed, [dragging]: target };
    setPlaced(newPlaced);
    setDragging(null);
    
    if (Object.keys(newPlaced).length === items.length) {
      const correctCount = Object.entries(newPlaced).filter(([id, t]) => items.find(i => i.id === id)?.target === t).length;
      updateModuleProgress('motor', correctCount * 10);
      setTimeout(() => setShowReward(true), 500);
    }
  };

  const correctCount = Object.entries(placed).filter(([id, t]) => items.find(i => i.id === id)?.target === t).length;

  return (
    <DashboardLayout>
      <div dir="rtl" className="p-6 max-w-4xl mx-auto">
        <RewardSystem isVisible={showReward} starsEarned={Math.ceil((correctCount/items.length)*3)}
          message={`أحسنت! وضعت ${correctCount} من ${items.length} في المكان الصحيح!`}
          onComplete={() => { setShowReward(false); setLocation("/dashboard"); }} />
        
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">✍️</span>
            <div>
              <h1 className="text-2xl font-black text-[#0d1b2a]">التناسق الحركي</h1>
              <p className="text-sm text-gray-500 font-bold">المحور السادس - اسحب وأفلت في المكان الصحيح</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-[#f97316]/20">
          <p className="text-center text-gray-600 mb-8 text-lg font-bold">اسحب كل عنصر إلى المجموعة الصحيحة</p>

          {/* Items to drag */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {items.filter(item => !placed[item.id]).map(item => (
              <div key={item.id} draggable
                onDragStart={() => setDragging(item.id)}
                className="bg-white border-2 border-[#f97316] rounded-2xl p-5 cursor-grab active:cursor-grabbing hover:shadow-xl transition-all text-center min-w-[100px] shadow-sm">
                <div className="text-5xl mb-2">{item.emoji}</div>
                <p className="text-sm font-black text-[#0d1b2a]">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Drop targets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {targets.map(target => (
              <div key={target}
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleDrop(target)}
                className="min-h-[200px] border-4 border-dashed border-[#f97316]/30 rounded-3xl p-4 bg-[#f97316]/5 flex flex-col items-center">
                <p className="text-center font-black text-[#f97316] mb-4 text-xl">{target}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {items.filter(item => placed[item.id] === target).map(item => {
                    const isCorrect = item.target === target;
                    return (
                      <div key={item.id} className={`rounded-2xl p-3 text-center shadow-sm ${isCorrect ? "bg-green-100 border-2 border-green-400" : "bg-red-100 border-2 border-red-400"}`}>
                        <div className="text-4xl">{item.emoji}</div>
                        <p className="text-xs font-black mt-1">{isCorrect ? "✅" : "❌"}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white font-black px-8 py-4 rounded-2xl text-lg" onClick={() => { setPlaced({}); setDragging(null); }}>
              إعادة المحاولة 🔄
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
