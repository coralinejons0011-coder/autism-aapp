import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Trophy, Star, Target } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import DashboardLayout from "@/components/DashboardLayout";

export default function ProgressPage() {
  const [, setLocation] = useLocation();
  const { modules, totalPoints, getProgressPercentage } = useProgress();

  return (
    <DashboardLayout>
      <div dir="rtl" className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            <h1 className="text-2xl font-black text-[#0d1b2a]">تقدمي وإنجازاتي</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="p-6 text-center bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl shadow-lg border-none">
            <Trophy size={40} className="mx-auto mb-3 opacity-80" />
            <p className="text-sm opacity-90 font-bold">النقاط الكلية</p>
            <h2 className="text-4xl font-black">{totalPoints}</h2>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-to-br from-[#4dd9e0] to-[#3bc8cf] text-white rounded-3xl shadow-lg border-none">
            <Star size={40} className="mx-auto mb-3 opacity-80" />
            <p className="text-sm opacity-90 font-bold">نسبة الإنجاز</p>
            <h2 className="text-4xl font-black">{getProgressPercentage()}%</h2>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white rounded-3xl shadow-lg border-none">
            <Target size={40} className="mx-auto mb-3 opacity-80" />
            <p className="text-sm opacity-90 font-bold">المحاور المكتملة</p>
            <h2 className="text-4xl font-black">{modules.filter(m => m.completed === m.total).length}/8</h2>
          </Card>
        </div>

        <h3 className="text-2xl font-black text-[#0d1b2a] mb-6">📊 تفاصيل المحاور</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => {
            const percent = Math.round((mod.completed / mod.total) * 100);
            return (
              <Card key={mod.moduleId} className="p-5 rounded-2xl border-2 border-gray-100 shadow-sm hover:border-[#4dd9e0]/30 transition-all">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-[#0d1b2a]">{mod.moduleName}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    mod.level === 'advanced' ? 'bg-purple-100 text-purple-700' :
                    mod.level === 'intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {mod.level === 'advanced' ? 'متقدم' : mod.level === 'intermediate' ? 'متوسط' : 'مبتدئ'}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                  <div className="bg-[#4dd9e0] h-3 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 font-bold">
                  <span>{percent}% مكتمل</span>
                  <span>{mod.score} نقطة</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
