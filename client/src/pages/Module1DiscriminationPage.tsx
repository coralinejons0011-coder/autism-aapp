import React, { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { RewardSystem } from "@/components/RewardSystem";

interface DiscriminationItem {
  id: string;
  image: string;
  label: string;
  category: 'fruit' | 'object' | 'animal';
}

export default function Module1DiscriminationPage() {
  const [, setLocation] = useLocation();
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);

  // Level 1: Fruits
  const fruitItems: DiscriminationItem[] = [
    { id: 'f1', image: '🍎', label: 'تفاح', category: 'fruit' },
    { id: 'f2', image: '🍌', label: 'موز', category: 'fruit' },
    { id: 'f3', image: '🍊', label: 'برتقال', category: 'fruit' },
    { id: 'f4', image: '🍓', label: 'فراولة', category: 'fruit' },
    { id: 'f5', image: '🍇', label: 'عنب', category: 'fruit' },
    { id: 'f6', image: '🍍', label: 'أناناس', category: 'fruit' },
  ];

  // Level 2: Objects
  const objectItems: DiscriminationItem[] = [
    { id: 'o1', image: '🚗', label: 'سيارة', category: 'object' },
    { id: 'o2', image: '🏠', label: 'منزل', category: 'object' },
    { id: 'o3', image: '📚', label: 'كتاب', category: 'object' },
    { id: 'o4', image: '🧸', label: 'لعبة', category: 'object' },
    { id: 'o5', image: '🚲', label: 'دراجة', category: 'object' },
    { id: 'o6', image: '⌚', label: 'ساعة', category: 'object' },
  ];

  // Level 3: Animals
  const animalItems: DiscriminationItem[] = [
    { id: 'a1', image: '🐱', label: 'قطة', category: 'animal' },
    { id: 'a2', image: '🐶', label: 'كلب', category: 'animal' },
    { id: 'a3', image: '🦁', label: 'أسد', category: 'animal' },
    { id: 'a4', image: '🐘', label: 'فيل', category: 'animal' },
    { id: 'a5', image: '🦒', label: 'زرافة', category: 'animal' },
    { id: 'a6', image: '🐰', label: 'أرنب', category: 'animal' },
  ];

  const getItems = () => {
    switch(level) {
      case 1: return fruitItems;
      case 2: return objectItems;
      case 3: return animalItems;
      default: return fruitItems;
    }
  };

  const getTargetLabel = () => {
    switch(level) {
      case 1: return 'الفواكه';
      case 2: return 'الأشياء';
      case 3: return 'الحيوانات';
      default: return 'الفواكه';
    }
  };

  const handleSelect = (item: DiscriminationItem) => {
    setScore(score + 10);
  };

  const nextLevel = () => {
    if (level < 3) {
      setLevel((level + 1) as 1 | 2 | 3);
    } else {
      setShowReward(true);
    }
  };

  return (
    <DashboardLayout>
      <div dir="rtl" className="p-6 max-w-4xl mx-auto">
        <RewardSystem 
          isVisible={showReward} 
          starsEarned={3}
          message="أحسنت! لقد أكملت جميع مستويات التصنيف بنجاح!"
          onComplete={() => { setShowReward(false); setLocation("/dashboard"); }} 
        />

        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">👁️</span>
            <div>
              <h1 className="text-2xl font-black text-[#0d1b2a]">التصنيف والتمييز</h1>
              <p className="text-sm text-gray-500 font-bold">المحور الأول - تعرف على {getTargetLabel()} وصنفها</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-cyan-400/20">
          <div className="text-center mb-8">
            <p className="text-2xl font-black text-[#0d1b2a] mb-6">اضغط على {getTargetLabel()} للتعرف عليها</p>
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l as 1 | 2 | 3)}
                  className={`px-8 py-3 rounded-2xl font-black transition-all shadow-md ${
                    level === l
                      ? 'bg-cyan-400 text-[#0d1b2a] scale-105'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  المستوى {l}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-3xl font-black text-yellow-500 bg-yellow-50 inline-block px-6 py-2 rounded-2xl border-2 border-yellow-200">
              ⭐ النقاط: {score}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
            {getItems().map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="bg-gray-50 hover:bg-white p-8 rounded-3xl transition-all transform hover:scale-105 border-4 border-transparent hover:border-cyan-400 shadow-sm hover:shadow-xl group"
              >
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">{item.image}</div>
                <p className="text-[#0d1b2a] text-xl font-black">{item.label}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-12 border-t pt-8">
            <Button variant="outline" onClick={() => setLocation("/dashboard")} className="px-8 py-6 rounded-2xl border-2 font-black text-lg">
              إنهاء النشاط
            </Button>
            <Button 
              onClick={nextLevel}
              className="px-8 py-6 bg-cyan-400 hover:bg-cyan-500 text-[#0d1b2a] rounded-2xl font-black text-lg shadow-lg flex items-center gap-2"
            >
              {level < 3 ? 'المستوى التالي' : 'إكمال النشاط'} <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
