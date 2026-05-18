import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, Settings } from "lucide-react";

export default function ParentDashboardPage() {
  const [, setLocation] = useLocation();
  const children = [
    { name: "أحمد", age: 7, stars: 24, activities: 8, lastActive: "اليوم" },
    { name: "سارة", age: 9, stars: 31, activities: 12, lastActive: "أمس" },
  ];
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      <div className="bg-white shadow-sm border-b border-[#4dd9e0]/30 px-4 py-4">
        <div className="container max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setLocation("/")} className="text-[#0d1b2a]">
              <ArrowRight size={20} className="ml-2" /> رجوع
            </Button>
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#0d1b2a]">لوحة الوالدين</h1>
                <p className="text-sm text-gray-500">VESIO PR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0d1b2a] mb-1">مرحباً، ولي الأمر!</h2>
          <p className="text-gray-500">إليك ملخص تقدم أطفالك</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {children.map((child, i) => (
            <Card key={i} className="p-6 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-[#4dd9e0]/20 rounded-full flex items-center justify-center text-3xl">
                  {i === 0 ? "👦" : "👧"}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0d1b2a]">{child.name}</h3>
                  <p className="text-sm text-gray-500">العمر: {child.age} سنوات</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-yellow-50 rounded-xl">
                  <p className="text-2xl font-bold text-yellow-600">{child.stars}</p>
                  <p className="text-xs text-gray-500">نجوم</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{child.activities}</p>
                  <p className="text-xs text-gray-500">أنشطة</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <p className="text-sm font-bold text-green-600">{child.lastActive}</p>
                  <p className="text-xs text-gray-500">آخر نشاط</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-[#4dd9e0] hover:bg-[#3bc8cf] text-[#0d1b2a] font-bold text-sm">
                  <BarChart3 size={16} className="ml-1" /> التقرير
                </Button>
                <Button variant="outline" className="flex-1 border-[#4dd9e0] text-[#0d1b2a] text-sm">
                  <Settings size={16} className="ml-1" /> الإعدادات
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <Card className="p-6 bg-gradient-to-l from-[#4dd9e0]/10 to-[#7c3aed]/10 border-[#4dd9e0]/30">
          <div className="flex gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="text-xl font-bold text-[#0d1b2a] mb-2">نصيحة للوالدين</h3>
              <p className="text-gray-600">
                جميع الأنشطة مصممة وفق المحاور الثمانية للإدراك البصري. تابع تقدم طفلك بانتظام وشجعه على الممارسة اليومية.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
