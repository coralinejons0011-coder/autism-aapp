import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function MemoryPage() {
  const [, setLocation] = useLocation();
  const [score, setScore] = useState(0);
  const [flipped, setFlipped] = useState<number[]>([]);

  const cards = [
    { id: 1, shape: "square", color: "bg-green-500" },
    { id: 2, shape: "square", color: "bg-green-500" },
    { id: 3, shape: "triangle", color: "bg-red-500" },
    { id: 4, shape: "triangle", color: "bg-red-500" },
    { id: 5, shape: "circle", color: "bg-blue-500" },
    { id: 6, shape: "circle", color: "bg-blue-500" },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      <div className="bg-white shadow-sm border-b border-[#4dd9e0]/30 px-4 py-4">
        <div className="container max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <h1 className="text-xl font-bold text-[#0d1b2a]">الذاكرة البصرية</h1>
          </div>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Card className="p-8 bg-white rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#0d1b2a] mb-8 text-center">ابحث عن الأزواج المتطابقة</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => setFlipped(flipped.includes(card.id) ? flipped.filter(id => id !== card.id) : [...flipped, card.id])}
                className="p-4 border-2 border-yellow-300 rounded-2xl hover:bg-yellow-50 transition-all"
              >
                {flipped.includes(card.id) ? (
                  <div className={`w-16 h-16 ${card.color} rounded-lg mx-auto`}></div>
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto flex items-center justify-center">
                    <span className="text-2xl">?</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg font-bold text-[#4dd9e0]">النقاط: {score}/3</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
