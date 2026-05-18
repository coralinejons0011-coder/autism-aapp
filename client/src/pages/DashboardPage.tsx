import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

const MODULES = [
  { id: 1, title: 'التمييز البصري', desc: 'تمييز الأشكال المختلفة', icon: '👁️', color: '#4dd9e0', path: '/module1', image: '/module1-discrimination.png' },
  { id: 2, title: 'التنظيم المكاني', desc: 'ترتيب الأشكال في الفضاء', icon: '🗺️', color: '#f59e0b', path: '/module2', image: '/module2-spatial.png' },
  { id: 3, title: 'الذاكرة البصرية', desc: 'تذكر الأشكال والألوان', icon: '🧠', color: '#10b981', path: '/module3', image: '/module3-memory.png' },
  { id: 4, title: 'التتابع البصري', desc: 'متابعة تسلسل الأشكال', icon: '🔄', color: '#8b5cf6', path: '/module4', image: '/module4-sequence.png' },
  { id: 5, title: 'الإغلاق البصري', desc: 'إكمال الأشكال الناقصة', icon: '🧩', color: '#f43f5e', path: '/module5', image: '/module5-closure.png' },
  { id: 6, title: 'التناسق الحركي', desc: 'تنسيق الحركة مع البصر', icon: '🎯', color: '#ec4899', path: '/module6', image: '/module6-motor.png' },
  { id: 7, title: 'الشكل والخلفية', desc: 'تمييز الشكل عن الخلفية', icon: '🔍', color: '#14b8a6', path: '/module7', image: '/module7-figureground.png' },
  { id: 8, title: 'الثبات الشكلي', desc: 'التعرف على الأشكال بأحجام مختلفة', icon: '🔺', color: '#f97316', path: '/module8', image: '/module8-constancy.png' },
];

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [childProfile, setChildProfile] = useState<any>(null);
  const [progress, setProgress] = useState<any>({});

  useEffect(() => {
    const u = localStorage.getItem('user');
    const cp = localStorage.getItem('childProfile');
    const p = localStorage.getItem('progress');
    if (!u) { setLocation('/'); return; }
    setUser(JSON.parse(u));
    if (cp) setChildProfile(JSON.parse(cp));
    if (p) setProgress(JSON.parse(p));
  }, [setLocation]);

  const completedModules = Object.keys(progress).length;
  const totalScore = Object.values(progress).reduce((sum: number, m: any) => sum + (m.score || 0), 0);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('childProfile');
    setLocation('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] to-[#1a2f3f]" dir="rtl">
      <nav className="bg-[#0d1b2a] border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#4dd9e0] rounded-lg flex items-center justify-center font-bold text-[#0d1b2a] text-sm">V</div>
          <span className="text-[#4dd9e0] font-bold text-lg">VESIO PR</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-300 text-sm hidden sm:block">
            {childProfile ? `👶 ${childProfile.name}` : (user.name || user.email)}
          </span>
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 text-sm transition">خروج</button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-4">
        <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-l from-[#1a2f3f] to-[#0d3a4a] border border-[#4dd9e0] border-opacity-30">
          <img src="/dashboard-hero.png" alt="VESIO PR" className="w-full h-40 object-cover opacity-40" />
          <div className="absolute inset-0 flex items-center p-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">مرحباً {childProfile ? childProfile.name : (user.name || 'بك')} 👋</h1>
              <p className="text-[#4dd9e0] text-sm">استمر في التعلم والتطور!</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#1a2f3f] rounded-xl p-3 text-center border border-gray-700">
            <div className="text-2xl font-bold text-[#4dd9e0]">{completedModules}/8</div>
            <div className="text-gray-400 text-xs mt-1">وحدات مكتملة</div>
          </div>
          <div className="bg-[#1a2f3f] rounded-xl p-3 text-center border border-gray-700">
            <div className="text-2xl font-bold text-yellow-400">⭐ {totalScore}</div>
            <div className="text-gray-400 text-xs mt-1">مجموع النقاط</div>
          </div>
          <div className="bg-[#1a2f3f] rounded-xl p-3 text-center border border-gray-700">
            <div className="text-2xl font-bold text-green-400">{Math.round((completedModules / 8) * 100)}%</div>
            <div className="text-gray-400 text-xs mt-1">نسبة التقدم</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>التقدم الإجمالي</span>
            <span>{completedModules} من 8 وحدات</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-[#4dd9e0] to-[#10b981] h-3 rounded-full transition-all duration-500" style={{ width: `${(completedModules / 8) * 100}%` }} />
          </div>
        </div>

        <h2 className="text-lg font-bold text-white mb-4">🎓 الوحدات التعليمية</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {MODULES.map(module => {
            const isCompleted = !!progress[`module${module.id}`];
            const moduleScore = progress[`module${module.id}`]?.score || 0;
            return (
              <button key={module.id} onClick={() => setLocation(module.path)}
                className="bg-[#1a2f3f] rounded-2xl overflow-hidden border border-gray-700 hover:border-opacity-80 transition-all duration-200 hover:scale-105 hover:shadow-lg text-right group"
                style={{ borderColor: isCompleted ? module.color : undefined }}>
                <div className="relative h-24 overflow-hidden">
                  <img src={module.image} alt={module.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition" />
                  {isCompleted && <div className="absolute top-2 left-2 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center text-xs text-white">✓</div>}
                  <div className="absolute top-2 right-2 text-xl">{module.icon}</div>
                </div>
                <div className="p-3">
                  <h3 className="text-white font-bold text-sm mb-1">{module.title}</h3>
                  <p className="text-gray-400 text-xs mb-2">{module.desc}</p>
                  {isCompleted ? (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-xs">⭐ {moduleScore}</span>
                      <span className="text-green-400 text-xs mr-auto">مكتمل</span>
                    </div>
                  ) : (
                    <div className="text-[#4dd9e0] text-xs">ابدأ الآن ←</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <div className="text-center mt-8 text-gray-600 text-xs">
          <p>© 2026 VESIO PR - برنامج تحسين الإدراك البصري</p>
        </div>
      </div>
    </div>
  );
}
