import React, { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";

interface DiscriminationItem {
  id: string;
  image: string;
  label: string;
  isTarget: boolean;
}

export default function Module1DiscriminationPage() {
  const [, setLocation] = useLocation();
  const [level, setLevel] = useState<1 | 2>(1);
  const [score, setScore] = useState(0);

  // Level 1: Simple shape discrimination
  const level1Items: DiscriminationItem[] = [
    { id: '1', image: '🔵', label: 'دائرة', isTarget: true },
    { id: '2', image: '🟩', label: 'مربع', isTarget: false },
    { id: '3', image: '🔵', label: 'دائرة', isTarget: true },
    { id: '4', image: '🔺', label: 'مثلث', isTarget: false },
  ];

  // Level 2: More complex discrimination
  const level2Items: DiscriminationItem[] = [
    { id: '1', image: '🍎', label: 'تفاح أحمر', isTarget: true },
    { id: '2', image: '🍊', label: 'برتقالة', isTarget: false },
    { id: '3', image: '🍎', label: 'تفاح أحمر', isTarget: true },
    { id: '4', image: '🍌', label: 'موز', isTarget: false },
  ];

  const items = level === 1 ? level1Items : level2Items;
  const targetLabel = level === 1 ? 'دائرة' : 'تفاح أحمر';

  const handleSelect = (item: DiscriminationItem) => {
    if (item.isTarget) {
      setScore(score + 10);
    }
  };

  return (
    <DashboardLayout>
      <div dir="rtl" className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">👁️</span>
            <div>
              <h1 className="text-2xl font-black text-[#0d1b2a]">التمييز البصري</h1>
              <p className="text-sm text-gray-500 font-bold">المحور الأول - اختر جميع الأشكال الصحيحة</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-cyan-400/20">
          <div className="text-center mb-8">
            <p className="text-2xl font-black text-[#0d1b2a] mb-6">اختر جميع {targetLabel}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setLevel(1)}
                className={`px-8 py-3 rounded-2xl font-black transition-all shadow-md ${
                  level === 1
                    ? 'bg-cyan-400 text-[#0d1b2a] scale-105'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                المستوى 1
              </button>
              <button
                onClick={() => setLevel(2)}
                className={`px-8 py-3 rounded-2xl font-black transition-all shadow-md ${
                  level === 2
                    ? 'bg-cyan-400 text-[#0d1b2a] scale-105'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                المستوى 2
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-3xl font-black text-yellow-500 bg-yellow-50 inline-block px-6 py-2 rounded-2xl border-2 border-yellow-200">
              ⭐ النقاط: {score}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8 max-w-lg mx-auto">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="bg-gray-50 hover:bg-white p-10 rounded-3xl transition-all transform hover:scale-105 border-4 border-transparent hover:border-cyan-400 shadow-sm hover:shadow-xl"
              >
                <div className="text-7xl mb-4">{item.image}</div>
                <p className="text-[#0d1b2a] text-xl font-black">{item.label}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-12 border-t pt-8">
            <Button variant="outline" onClick={() => setLocation("/dashboard")} className="px-8 py-6 rounded-2xl border-2 font-black text-lg">
              إنهاء النشاط
            </Button>
            <Button className="px-8 py-6 bg-cyan-400 hover:bg-cyan-500 text-[#0d1b2a] rounded-2xl font-black text-lg shadow-lg flex items-center gap-2">
              المستوى التالي <ChevronRight size={24} />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
