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
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] to-[#1a2f3f] flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="text-6xl font-bold text-[#4dd9e0] mb-4 tracking-tighter">VESIO PR</div>
          <div className="text-xl text-[#a0d8dc] font-light mb-8">برنامج تحسين الإدراك البصري</div>
          <p className="text-gray-300 text-sm leading-relaxed px-6">
            تطبيق متخصص لتحسين المهارات البصرية عند الأطفال من ذوي اضطراب طيف التوحد من خلال أنشطة تفاعلية ممتعة
          </p>
        </div>

        <div className="space-y-4 px-4">
          <button
            onClick={() => setLocation('/signup')}
            className="w-full bg-[#4dd9e0] hover:bg-[#3bc5cc] text-[#0d1b2a] font-bold py-4 px-4 rounded-2xl transition duration-200 transform hover:scale-105 shadow-lg"
          >
            إنشاء حساب جديد
          </button>
          <button
            onClick={() => setLocation('/login')}
            className="w-full bg-transparent border-2 border-[#4dd9e0] hover:bg-[#4dd9e0] hover:text-[#0d1b2a] text-[#4dd9e0] font-bold py-4 px-4 rounded-2xl transition duration-200 shadow-md"
          >
            تسجيل الدخول
          </button>
        </div>

        <div className="mt-16 text-center text-[10px] text-gray-500 uppercase tracking-widest">
          <p>© 2026 VESIO PR · Visual Perception Program</p>
        </div>
      </div>
    </div>
  );
}
