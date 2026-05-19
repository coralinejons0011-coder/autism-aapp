import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { DailyVisualSchedule } from "@/components/DailyVisualSchedule";
import { ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

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
    <DashboardLayout>
      <div dir="rtl" className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">📅</span>
            <h1 className="text-2xl font-black text-[#0d1b2a]">الجدول اليومي</h1>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-3xl shadow-sm border-2 border-[#4dd9e0]/20 mb-8">
            <h2 className="text-xl font-bold text-[#0d1b2a] mb-4 text-center">جدول المهام البصري</h2>
            <p className="text-gray-500 text-center mb-8">يساعد الجدول البصري طفلك على فهم الروتين اليومي وتقليل التوتر.</p>
            <DailyVisualSchedule tasks={sampleTasks} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
