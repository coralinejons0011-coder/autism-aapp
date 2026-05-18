import { useLocation } from 'wouter';

export default function WelcomePage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] to-[#1a2f3f] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="text-5xl font-bold text-[#4dd9e0] mb-4">VESIO PR</div>
          <div className="text-lg text-[#a0d8dc] font-light mb-8">برنامج تحسين الإدراك البصري</div>
          <p className="text-gray-300 text-sm leading-relaxed">
            تطبيق متخصص لتحسين المهارات البصرية عند الأطفال من ذوي اضطراب طيف التوحد
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setLocation('/signup')}
            className="w-full bg-[#4dd9e0] hover:bg-[#3bc5cc] text-[#0d1b2a] font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            إنشاء حساب جديد
          </button>
          <button
            onClick={() => setLocation('/login')}
            className="w-full bg-transparent border-2 border-[#4dd9e0] hover:bg-[#4dd9e0] hover:text-[#0d1b2a] text-[#4dd9e0] font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            تسجيل الدخول
          </button>
        </div>

        <div className="mt-12 text-center text-xs text-gray-400">
          <p>© 2026 VESIO PR. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
}
