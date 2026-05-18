import React, { useState, useEffect } from 'react';

export default function Module3MemoryPage() {
  const [level, setLevel] = useState<1 | 2>(1);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(true);
  const [timeLeft, setTimeLeft] = useState(level === 1 ? 5 : 3);

  useEffect(() => {
    if (revealed && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setRevealed(false);
    }
  }, [timeLeft, revealed]);

  const items = level === 1 
    ? ['🍎', '🍌', '🍊'] 
    : ['🍎', '🍌', '🍊', '🍇', '🍓'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">🧠 الذاكرة البصرية</h1>
        <p className="text-gray-300 mb-8">تذكر الأشكال قبل اختفاؤها!</p>

        {revealed ? (
          <div>
            <p className="text-2xl font-bold text-yellow-400 mb-8">الوقت المتبقي: {timeLeft}s</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {items.map((item, idx) => (
                <div key={idx} className="text-6xl p-8 bg-slate-700 rounded-lg">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-2xl font-bold text-cyan-400 mb-8">ماذا تتذكر؟</p>
            <div className="grid grid-cols-3 gap-4">
              {['🍎', '🍌', '🍊', '🍇', '🍓', '🥝'].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setScore(score + 10)}
                  className="text-6xl p-8 bg-slate-700 hover:bg-slate-600 rounded-lg"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="text-2xl font-bold text-yellow-400 mt-8">⭐ النقاط: {score}</p>
      </div>
    </div>
  );
}
