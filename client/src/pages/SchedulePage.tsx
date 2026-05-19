import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { DailyVisualSchedule } from "@/components/DailyVisualSchedule";
import { ArrowRight } from "lucide-react";

const sampleTasks = [
  { id: 1, title: "وقت الإفطار", description: "تناول وجبة الإفطار الصحية", icon: "🍳", completed: false, order: 1 },
  { id: 2, title: "الروتين الصباحي", description: "غسل الأسنان وارتداء الملابس", icon: "🪥", completed: false, order: 2 },
  { id: 3, title: "وقت التعلم", description: "ممارسة الأنشطة التعليمية", icon: "📚", completed: false, order: 3 },
  { id: 4, title: "وقت اللعب", description: "اللعب الحر والاسترخاء", icon: "🎮", completed: false, order: 4 },
  { id: 5, title: "وقت الغداء", description: "تناول وجبة الغداء", icon: "🍽️", completed: false, order: 5 },
  { id: 6, title: "وقت النوم", description: "الاسترخاء والنوم المبكر", icon: "😴", completed: false, order: 6 },
];

export default function SchedulePage() {
  const [, setLocation] = useLocation();
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      <div className="bg-white shadow-sm border-b border-[#4dd9e0]/30 px-4 py-4">
        <div className="container max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">📅</span>
            <h1 className="text-xl font-bold text-[#0d1b2a]">الجدول اليومي</h1>
          </div>
        </div>
      </div>
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <DailyVisualSchedule tasks={sampleTasks} />
      </div>
    </div>
  );
}
