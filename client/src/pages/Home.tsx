import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import DashboardLayout from "@/components/DashboardLayout";

const modules = [
  { id: "shape-matching", path: "/shape-matching", emoji: "🎨", title: "التمييز البصري", subtitle: "مطابقة الأشكال والألوان", color: "from-[#4dd9e0]/20 to-[#4dd9e0]/5", border: "border-[#4dd9e0]", badge: "المحور ١" },
  { id: "spatial", path: "/spatial", emoji: "🧩", title: "التنظيم المكاني", subtitle: "الاتجاهات والمواضع", color: "from-[#7c3aed]/20 to-[#7c3aed]/5", border: "border-[#7c3aed]", badge: "المحور ٢" },
  { id: "memory", path: "/memory", emoji: "🧠", title: "الذاكرة البصرية", subtitle: "تذكر الأشكال والصور", color: "from-[#f59e0b]/20 to-[#f59e0b]/5", border: "border-[#f59e0b]", badge: "المحور ٣" },
  { id: "sequence", path: "/sequence", emoji: "🔢", title: "التتابع البصري", subtitle: "اتبع التسلسل الصحيح", color: "from-[#10b981]/20 to-[#10b981]/5", border: "border-[#10b981]", badge: "المحور ٤" },
  { id: "closure", path: "/closure", emoji: "⭕", title: "الإغلاق البصري", subtitle: "أكمل الأشكال الناقصة", color: "from-[#ec4899]/20 to-[#ec4899]/5", border: "border-[#ec4899]", badge: "المحور ٥" },
  { id: "motor", path: "/motor", emoji: "✍️", title: "التناسق الحركي", subtitle: "اسحب وأفلت في مكانه", color: "from-[#f97316]/20 to-[#f97316]/5", border: "border-[#f97316]", badge: "المحور ٦" },
  { id: "figure-ground", path: "/figure-ground", emoji: "🔍", title: "الشكل والخلفية", subtitle: "ابحث عن الأشياء المخفية", color: "from-[#06b6d4]/20 to-[#06b6d4]/5", border: "border-[#06b6d4]", badge: "المحور ٧" },
  { id: "form-constancy", path: "/form-constancy", emoji: "🔺", title: "الثبات الشكلي", subtitle: "تعرف على الأشكال بأحجام مختلفة", color: "from-[#84cc16]/20 to-[#84cc16]/5", border: "border-[#84cc16]", badge: "المحور ٨" },
];

const extras = [
  { path: "/emotions", emoji: "😊", title: "المشاعر", subtitle: "تعلم التعبيرات", color: "from-pink-100 to-pink-50", border: "border-pink-300" },
  { path: "/schedule", emoji: "📅", title: "جدولي اليومي", subtitle: "روتيني اليومي", color: "from-blue-100 to-blue-50", border: "border-blue-300" },
  { path: "/progress", emoji: "⭐", title: "تقدمي", subtitle: "نجومي وإنجازاتي", color: "from-yellow-100 to-yellow-50", border: "border-yellow-300" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { modules: progressModules, totalPoints, getProgressPercentage } = useProgress();

  return (
    <DashboardLayout>
      <div dir="rtl" className="p-6 max-w-5xl mx-auto">
        {/* Welcome */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-4xl font-black text-[#0d1b2a] mb-2">مرحباً {user?.name || 'بك'}!</h2>
          <p className="text-xl text-gray-500">اختر نشاطاً وابدأ التعلم الممتع</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-[#4dd9e0]/20 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">النجوم المكتسبة</p>
              <p className="text-3xl font-black text-yellow-500">{totalPoints} ⭐</p>
            </div>
            <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-3xl">🏆</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-[#7c3aed]/20">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm text-gray-500">التقدم الإجمالي</p>
              <p className="text-sm font-bold text-[#7c3aed]">{getProgressPercentage()}%</p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div 
                className="bg-gradient-to-l from-[#4dd9e0] to-[#7c3aed] h-3 rounded-full transition-all duration-1000" 
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>

        {/* 8 Modules */}
        <h3 className="text-2xl font-black text-[#0d1b2a] mb-6 flex items-center gap-3">
          <span className="w-8 h-8 bg-[#4dd9e0] rounded-lg flex items-center justify-center text-white text-sm">8</span>
          المحاور الثمانية للإدراك البصري
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {modules.map((mod) => {
            const progress = progressModules.find(pm => pm.moduleId === mod.id);
            const percent = progress ? Math.round((progress.completed / progress.total) * 100) : 0;
            
            return (
              <button key={mod.path} onClick={() => setLocation(mod.path)}
                className={`bg-gradient-to-br ${mod.color} border-2 ${mod.border} rounded-3xl p-5 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 p-2">
                   <span className="text-[10px] font-bold text-gray-400 bg-white/70 px-2 py-0.5 rounded-full">{mod.badge}</span>
                </div>
                <div className="text-5xl my-3 group-hover:scale-110 transition-transform">{mod.emoji}</div>
                <h4 className="font-black text-[#0d1b2a] text-base leading-tight">{mod.title}</h4>
                <div className="mt-3 w-full bg-white/50 rounded-full h-1.5">
                  <div className="bg-[#4dd9e0] h-1.5 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">{percent}% مكتمل</p>
              </button>
            );
          })}
        </div>

        {/* Extra Activities */}
        <h3 className="text-2xl font-black text-[#0d1b2a] mb-6">✨ أنشطة إضافية</h3>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {extras.map((ex) => (
            <button key={ex.path} onClick={() => setLocation(ex.path)}
              className={`bg-gradient-to-br ${ex.color} border-2 ${ex.border} rounded-3xl p-5 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}>
              <div className="text-5xl mb-3">{ex.emoji}</div>
              <h4 className="font-black text-[#0d1b2a] text-base">{ex.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{ex.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
