import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

export default function WelcomePage() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      setLocation('/dashboard');
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex flex-col items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#4dd9e0]/10 rounded-full -ml-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7c3aed]/10 rounded-full -mr-48 -mb-48 blur-3xl" />
      
      <div className="max-w-2xl w-full text-center z-10">
        <div className="mb-12 animate-bounce">
          <div className="w-32 h-32 bg-gradient-to-br from-[#4dd9e0] to-[#7c3aed] rounded-[40px] mx-auto flex items-center justify-center shadow-2xl rotate-12">
            <span className="text-white text-6xl font-black -rotate-12">V</span>
          </div>
        </div>
        
        <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
          VESIO <span className="text-[#4dd9e0]">PR</span>
        </h1>
        
        <p className="text-2xl text-[#a0d8dc] mb-12 font-bold leading-relaxed">
          برنامج تحسين الإدراك البصري المتكامل <br />
          <span className="text-sm text-gray-400 font-normal">مصمم خصيصاً لدعم أطفال طيف التوحد</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          <button 
            onClick={() => setLocation('/login')}
            className="bg-[#4dd9e0] hover:bg-[#3bc5cc] text-[#0d1b2a] font-black py-6 rounded-3xl text-xl shadow-xl transition-all transform hover:scale-105"
          >
            ابدأ الآن 🚀
          </button>
          <button 
            onClick={() => setLocation('/signup')}
            className="bg-transparent border-2 border-[#4dd9e0] text-[#4dd9e0] hover:bg-[#4dd9e0]/10 font-black py-6 rounded-3xl text-xl transition-all transform hover:scale-105"
          >
            إنشاء حساب
          </button>
        </div>

        <div className="mt-16 flex justify-center gap-8 text-[#4dd9e0]/60">
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🧠</span>
            <span className="text-xs font-bold">تطوير مهارات</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🎮</span>
            <span className="text-xs font-bold">تعلم ممتع</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">📊</span>
            <span className="text-xs font-bold">متابعة دقيقة</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-gray-500 text-xs font-bold">
        © 2026 VESIO PR · جميع الحقوق محفوظة
      </div>
    </div>
  );
}
