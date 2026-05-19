import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import DashboardLayout from "@/components/DashboardLayout";

export default function ParentDashboardPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { totalPoints, modules } = useProgress();
  
  const completedCount = modules.filter(m => m.completed === m.total).length;

  return (
    <DashboardLayout>
      <div dir="rtl" className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => setLocation("/dashboard")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">👨‍👩‍👧</span>
            <h1 className="text-2xl font-black text-[#0d1b2a]">لوحة الوالدين</h1>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-black text-[#0d1b2a] mb-2">مرحباً، {user?.name || 'ولي الأمر'}! 👋</h2>
          <p className="text-gray-500">إليك ملخص شامل لتقدم طفلك في رحلة التعلم.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card className="p-8 bg-white hover:shadow-xl transition-all border-2 border-[#4dd9e0]/30 rounded-3xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#4dd9e0] to-[#7c3aed] rounded-3xl flex items-center justify-center text-4xl shadow-lg">
                👦
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0d1b2a] mb-1">{user?.name || 'الطفل'}</h3>
                <p className="text-gray-500 font-bold">المستوى الحالي: <span className="text-[#7c3aed]">{completedCount > 4 ? 'متقدم' : 'مبتدئ'}</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-5 bg-yellow-50 rounded-2xl border-2 border-yellow-100">
                <p className="text-3xl font-black text-yellow-600 mb-1">{totalPoints}</p>
                <p className="text-sm text-gray-500 font-bold">نجمة مكتسبة</p>
              </div>
              <div className="text-center p-5 bg-blue-50 rounded-2xl border-2 border-blue-100">
                <p className="text-3xl font-black text-blue-600 mb-1">{completedCount}</p>
                <p className="text-sm text-gray-500 font-bold">محاور مكتملة</p>
              </div>
              <div className="text-center p-5 bg-green-50 rounded-2xl border-2 border-green-100">
                <p className="text-xl font-black text-green-600 mb-1">نشط جداً</p>
                <p className="text-sm text-gray-500 font-bold">حالة الطفل</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => setLocation("/progress")} className="flex-1 bg-[#4dd9e0] hover:bg-[#3bc8cf] text-[#0d1b2a] font-black py-6 rounded-2xl text-lg shadow-md">
                عرض التقارير المفصلة 📊
              </Button>
              <Button variant="outline" className="flex-1 border-2 border-[#4dd9e0] text-[#0d1b2a] font-black py-6 rounded-2xl text-lg">
                إعدادات الحساب ⚙️
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-l from-[#4dd9e0]/10 to-[#7c3aed]/10 border-2 border-[#4dd9e0]/30 rounded-3xl">
          <div className="flex gap-6 items-start">
            <div className="text-5xl">💡</div>
            <div>
              <h3 className="text-xl font-black text-[#0d1b2a] mb-3">نصيحة تربوية</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                التكرار هو مفتاح النجاح في تطوير الإدراك البصري. شجع طفلك على ممارسة الأنشطة لمدة 15 دقيقة يومياً لضمان أفضل النتائج في تحسين التركيز والتمييز البصري.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
