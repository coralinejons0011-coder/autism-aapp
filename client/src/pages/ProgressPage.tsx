import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star, Trophy, Zap, CheckCircle } from "lucide-react";

export default function ProgressPage() {
  const [, setLocation] = useLocation();
  const stats = { totalStars: 24, activitiesCompleted: 8, tasksCompleted: 15, streakDays: 3 };
  const recentActivities = [
    { name: "التمييز البصري", stars: 3, date: "اليوم" },
    { name: "التعرف على المشاعر", stars: 2, date: "أمس" },
    { name: "الجدول اليومي", stars: 3, date: "أمس" },
    { name: "الذاكرة البصرية", stars: 2, date: "منذ يومين" },
  ];
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      <div className="bg-white shadow-sm border-b border-[#4dd9e0]/30 px-4 py-4">
        <div className="container max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/")} className="text-[#0d1b2a]">
            <ArrowRight size={20} className="ml-2" /> رجوع
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">⭐</span>
            <h1 className="text-xl font-bold text-[#0d1b2a]">تقدمي</h1>
          </div>
        </div>
      </div>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 text-center bg-yellow-50 border-yellow-200">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-yellow-600">{stats.totalStars}</p>
            <p className="text-sm text-gray-600">إجمالي النجوم</p>
          </Card>
          <Card className="p-5 text-center bg-blue-50 border-blue-200">
            <Trophy className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-blue-600">{stats.activitiesCompleted}</p>
            <p className="text-sm text-gray-600">أنشطة مكتملة</p>
          </Card>
          <Card className="p-5 text-center bg-green-50 border-green-200">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-green-600">{stats.tasksCompleted}</p>
            <p className="text-sm text-gray-600">مهام مكتملة</p>
          </Card>
          <Card className="p-5 text-center bg-purple-50 border-purple-200">
            <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-purple-600">{stats.streakDays}</p>
            <p className="text-sm text-gray-600">أيام متتالية</p>
          </Card>
        </div>
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold text-[#0d1b2a] mb-4">الأنشطة الأخيرة</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-bold text-[#0d1b2a]">{activity.name}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: activity.stars }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-l from-[#4dd9e0]/10 to-[#7c3aed]/10 border-[#4dd9e0]/30 text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="text-xl font-bold text-[#0d1b2a] mb-2">استمر هكذا!</h3>
          <p className="text-gray-600">أنت تتقدم بشكل رائع. واصل التعلم كل يوم!</p>
        </Card>
      </div>
    </div>
  );
}
