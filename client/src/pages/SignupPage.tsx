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
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#4dd9e0] mb-2">إنشاء حساب جديد</h1>
          <p className="text-gray-300">انضم إلى رحلة تطور طفلك</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2 text-right">الاسم الكامل</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1a2f3f] border-2 border-[#4dd9e0] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#3bc5cc] text-right"
              placeholder="الاسم"
              required
            />
          </div>

          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2 text-right">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a2f3f] border-2 border-[#4dd9e0] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#3bc5cc] text-right"
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
              className="w-full bg-[#1a2f3f] border-2 border-[#4dd9e0] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#3bc5cc] text-right"
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
              className="w-full bg-[#1a2f3f] border-2 border-[#4dd9e0] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#3bc5cc] text-right"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm text-right">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4dd9e0] hover:bg-[#3bc5cc] disabled:opacity-50 text-[#0d1b2a] font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'جاري التحميل...' : 'إنشاء الحساب'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            لديك حساب بالفعل؟{' '}
            <button
              onClick={() => setLocation('/login')}
              className="text-[#4dd9e0] hover:text-[#3bc5cc] font-semibold"
            >
              تسجيل الدخول
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
