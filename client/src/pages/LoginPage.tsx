import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(email, password);
      // Compatibility with old storage
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        email,
      }));
      setLocation('/child-profile');
    } catch (err) {
      setError('فشل تسجيل الدخول. يرجى التحقق من بياناتك.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] to-[#1a2f3f] flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#4dd9e0] mb-2">تسجيل الدخول</h1>
          <p className="text-gray-300">رحباً بعودتك</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error && <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm text-right">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4dd9e0] hover:bg-[#3bc5cc] disabled:opacity-50 text-[#0d1b2a] font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            ليس لديك حساب؟{' '}
            <button
              onClick={() => setLocation('/signup')}
              className="text-[#4dd9e0] hover:text-[#3bc5cc] font-semibold"
            >
              إنشاء حساب
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
