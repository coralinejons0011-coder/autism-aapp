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
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] to-[#1a2f3f] flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#4dd9e0] mb-2">إنشاء ملف الطفل</h1>
          <p className="text-gray-300">أخبرنا عن طفلك</p>
        </div>

        <form onSubmit={handleCreateProfile} className="space-y-4">
          <div>
            <label className="block text-[#a0d8dc] text-sm font-semibold mb-2 text-right">اسم الطفل</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full bg-[#1a2f3f] border-2 border-[#4dd9e0] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#3bc5cc] text-right"
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
              className="w-full bg-[#1a2f3f] border-2 border-[#4dd9e0] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#3bc5cc] text-right"
              placeholder="أدخل العمر"
              min="3"
              max="18"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4dd9e0] hover:bg-[#3bc5cc] disabled:opacity-50 text-[#0d1b2a] font-bold py-3 px-4 rounded-lg transition duration-200 mt-6"
          >
            {loading ? 'جاري الإنشاء...' : 'ابدأ الآن'}
          </button>
        </form>
      </div>
    </div>
  );
}
