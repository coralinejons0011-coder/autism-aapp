import { useState } from 'react';
import { useLocation } from 'wouter';

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
      }));
      setLoading(false);
      setLocation('/child-profile');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] to-[#1a2f3f] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#4dd9e0] mb-2">إنشاء حساب</h1>
          <p className="text-gray-300">انضم إلى VESIO PR اليوم</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2">الاسم</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#1a2f3f] border-2 border-[#4dd9e0] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#3bc5cc]"
              placeholder="أدخل اسمك"
              required
            />
          </div>

          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#1a2f3f] border-2 border-[#4dd9e0] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#3bc5cc]"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2">كلمة المرور</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-[#1a2f3f] border-2 border-[#4dd9e0] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#3bc5cc]"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2">تأكيد كلمة المرور</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full bg-[#1a2f3f] border-2 border-[#4dd9e0] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#3bc5cc]"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4dd9e0] hover:bg-[#3bc5cc] disabled:opacity-50 text-[#0d1b2a] font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            هل لديك حساب بالفعل؟{' '}
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
