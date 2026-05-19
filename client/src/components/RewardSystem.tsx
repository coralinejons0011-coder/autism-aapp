import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface RewardSystemProps {
  isVisible: boolean;
  starsEarned: number;
  message?: string;
  onComplete?: () => void;
}

const encouragingMessages = [
  "أحسنت! لقد نجحت! 🌟",
  "عمل رائع! 🎉",
  "أنت مذهل! 💪",
  "جهد ممتاز! 🏆",
  "أحسنت! 👏",
  "أنت نجم! ⭐",
  "رائع جداً! 🌈",
  "أنت تتقدم بشكل جميل! 🚀",
];

export function RewardSystem({ isVisible, starsEarned, message, onComplete }: RewardSystemProps) {
  const [displayedStars, setDisplayedStars] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedStars(0);
      return;
    }
    let currentStar = 0;
    const interval = setInterval(() => {
      if (currentStar < starsEarned) {
        setDisplayedStars(currentStar + 1);
        currentStar++;
      } else {
        clearInterval(interval);
        setTimeout(() => { onComplete?.(); }, 3000);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [isVisible, starsEarned, onComplete]);

  if (!isVisible) return null;

  const displayMessage = message || encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];

  return (
    <div dir="rtl" className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md mx-4 slide-up-calm">
        <div className="text-6xl mb-6">🎉</div>
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {Array.from({ length: starsEarned }).map((_, index) => (
            <div key={index} className={`transform transition-all duration-500 ${
              index < displayedStars ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}>
              <Star size={56} className="fill-yellow-400 text-yellow-400" strokeWidth={1.5} />
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-bold text-[#0d1b2a] mb-4">{displayMessage}</h2>
        <p className="text-lg text-gray-500">
          حصلت على {starsEarned} {starsEarned === 1 ? "نجمة" : "نجوم"}!
        </p>
      </div>
    </div>
  );
}

export default RewardSystem;
