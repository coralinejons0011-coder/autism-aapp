import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";

const modules = [
  { id: "shape-matching", path: "/shape-matching", emoji: "👁️", title: "التمييز البصري", subtitle: "مطابقة الأشكال والألوان", color: "from-[#4dd9e0]/20 to-[#4dd9e0]/5", border: "border-[#4dd9e0]", badge: "المحور ١" },
  { id: "spatial", path: "/spatial", emoji: "🗺️", title: "التنظيم المكاني", subtitle: "الاتجاهات والمواضع", color: "from-[#7c3aed]/20 to-[#7c3aed]/5", border: "border-[#7c3aed]", badge: "المحور ٢" },
  { id: "memory", path: "/memory", emoji: "🧠", title: "الذاكرة البصرية", subtitle: "تذكر الأشكال والصور", color: "from-[#f59e0b]/20 to-[#f59e0b]/5", border: "border-[#f59e0b]", badge: "المحور ٣" },
  { id: "sequence", path: "/sequence", emoji: "🔄", title: "التتابع البصري", subtitle: "اتبع التسلسل الصحيح", color: "from-[#10b981]/20 to-[#10b981]/5", border: "border-[#10b981]", badge: "المحور ٤" },
  { id: "closure", path: "/closure", emoji: "🧩", title: "الإغلاق البصري", subtitle: "أكمل الأشكال الناقصة", color: "from-[#ec4899]/20 to-[#ec4899]/5", border: "border-[#ec4899]", badge: "المحور ٥" },
  { id: "motor", path: "/motor", emoji: "🎯", title: "التناسق الحركي", subtitle: "اسحب وأفلت في مكانه", color: "from-[#f97316]/20 to-[#f97316]/5", border: "border-[#f97316]", badge: "المحور ٦" },
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
  const { user, logout } = useAuth();
  const { modules: progressModules, totalPoints } = useProgress();

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#4dd9e0]/30 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4dd9e0] rounded-xl flex items-center justify-center text-white font-bold text-xl">V</div>
            <div>
              <h1 className="text-xl font-black text-[#0d1b2a] tracking-tight">VESIO PR</h1>
              <p className="text-[10px] text-[#4dd9e0] font-semibold">تطبيق الإدراك البصري</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-left">
              <p className="text-xs text-gray-500">النقاط الكلية</p>
              <p className="text-sm font-bold text-[#4dd9e0]">{totalPoints} ⭐</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setLocation("/parent-dashboard")} className="text-[#0d1b2a] text-sm">
              👨‍👩‍👧 لوحة الوالدين
            </Button>
            <Button variant="outline" size="sm" onClick={logout} className="text-red-500 border-red-200 hover:bg-red-50">
              خروج
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-4xl font-black text-[#0d1b2a] mb-2">مرحباً {user?.name || 'بك'}!</h2>
          <p className="text-xl text-gray-500">اختر نشاطاً وابدأ التعلم الممتع</p>
        </div>

        {/* 8 Modules */}
        <h3 className="text-2xl font-black text-[#0d1b2a] mb-5">🎯 المحاور الثمانية للإدراك البصري</h3>
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
                <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-[#4dd9e0] h-1.5 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">{percent}% مكتمل</p>
              </button>
            );
          })}
        </div>

        {/* Extra Activities */}
        <h3 className="text-2xl font-black text-[#0d1b2a] mb-5">✨ أنشطة إضافية</h3>
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

        {/* Footer */}
        <div className="text-center py-6 border-t border-gray-100">
          <span className="font-black text-[#0d1b2a]">VESIO PR</span>
          <p className="text-xs text-gray-400 mt-1">تطبيق تعليمي متخصص لأطفال طيف التوحد · الإدراك البصري</p>
        </div>
      </main>
    </div>
  );
}
