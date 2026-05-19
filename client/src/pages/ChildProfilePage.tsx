import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

export default function ChildProfilePage() {
  const [, setLocation] = useLocation();
  const { createChildProfile, user } = useAuth();
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setLocation('/login');
      return;
    }
    setLoading(true);

    try {
      await createChildProfile(childName, parseInt(age));
      // Also set the old storage keys for backward compatibility with existing pages
      localStorage.setItem('childProfile', JSON.stringify({
        name: childName,
        age,
        createdAt: new Date().toISOString(),
      }));
      setLocation('/dashboard');
    } catch (error) {
      console.error('Failed to create profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex flex-col items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#4dd9e0]/10 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7c3aed]/10 rounded-full -ml-48 -mb-48 blur-3xl" />

      <div className="max-w-md w-full bg-[#1a2f3f] p-8 rounded-3xl border-2 border-[#4dd9e0]/30 shadow-2xl z-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">👦</div>
          <h1 className="text-3xl font-bold text-[#4dd9e0] mb-2">إنشاء ملف الطفل</h1>
          <p className="text-gray-300">أخبرنا عن طفلك لنبدأ رحلة التعلم</p>
        </div>

        <form onSubmit={handleCreateProfile} className="space-y-6">
          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2 text-right">اسم الطفل</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full bg-[#0d1b2a] border-2 border-[#4dd9e0]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4dd9e0] text-right transition-all"
              placeholder="أدخل اسم الطفل"
              required
            />
          </div>

          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2 text-right">العمر</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-[#0d1b2a] border-2 border-[#4dd9e0]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4dd9e0] text-right transition-all"
              placeholder="أدخل العمر"
              min="3"
              max="18"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4dd9e0] hover:bg-[#3bc5cc] disabled:opacity-50 text-[#0d1b2a] font-black py-4 px-4 rounded-xl transition duration-200 shadow-lg transform hover:scale-[1.02] mt-6"
          >
            {loading ? 'جاري الإنشاء...' : 'ابدأ الآن 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
}
