import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      await signup(email, password, name, 'parent');
      // Compatibility
      localStorage.setItem('user', JSON.stringify({
        id: Date.now().toString(),
        name,
        email,
      }));
      setLocation('/child-profile');
    } catch (err) {
      setError('فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] to-[#1a2f3f] flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full bg-[#1a2f3f] p-8 rounded-3xl border-2 border-[#4dd9e0]/30 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-3xl font-bold text-[#4dd9e0] mb-2">إنشاء حساب جديد</h1>
          <p className="text-gray-300">انضم إلى رحلة تطور طفلك مع VESIO PR</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2 text-right">الاسم الكامل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0d1b2a] border-2 border-[#4dd9e0]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4dd9e0] text-right transition-all"
              placeholder="الاسم الكامل"
              required
            />
          </div>

          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2 text-right">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d1b2a] border-2 border-[#4dd9e0]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4dd9e0] text-right transition-all"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2 text-right">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d1b2a] border-2 border-[#4dd9e0]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4dd9e0] text-right transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2 text-right">تأكيد كلمة المرور</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#0d1b2a] border-2 border-[#4dd9e0]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4dd9e0] text-right transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-2 rounded-xl text-sm text-right animate-pulse">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4dd9e0] hover:bg-[#3bc5cc] disabled:opacity-50 text-[#0d1b2a] font-black py-4 px-4 rounded-xl transition duration-200 shadow-lg transform hover:scale-[1.02] mt-4"
          >
            {loading ? 'جاري التحميل...' : 'إنشاء الحساب'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-gray-400 text-sm">
            لديك حساب بالفعل؟{' '}
            <button
              onClick={() => setLocation('/login')}
              className="text-[#4dd9e0] hover:text-[#3bc5cc] font-bold underline decoration-2 underline-offset-4"
            >
              تسجيل الدخول
            </button>
          </p>
          <button onClick={() => setLocation('/')} className="mt-4 text-gray-500 text-xs hover:text-gray-300">
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
