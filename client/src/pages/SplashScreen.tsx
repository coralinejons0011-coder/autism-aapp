import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function SplashScreen() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation('/welcome');
    }, 3000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] to-[#1a2f3f] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 animate-bounce">
          <div className="text-6xl font-bold text-[#4dd9e0] mb-4">VESIO PR</div>
          <div className="text-xl text-[#a0d8dc] font-light">برنامج تحسين الإدراك البصري</div>
        </div>
        <div className="mt-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#4dd9e0] border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
}
