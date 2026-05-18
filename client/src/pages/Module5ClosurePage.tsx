import React, { useState } from 'react';

export default function Module5ClosurePage() {
  const [level, setLevel] = useState<1 | 2>(1);
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">🧩 الإغلاق البصري</h1>
      <p className="text-gray-300 mb-8">ما هي الصورة الناقصة؟</p>
      <div className="text-9xl mb-8 opacity-50">🔵</div>
      <p className="text-gray-400 mb-8">الصورة غير واضحة... ما هي؟</p>
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        {['🔵', '🟩', '🔺'].map((item, idx) => (
          <button key={idx} className="text-6xl p-8 bg-slate-700 hover:bg-slate-600 rounded-lg">
            {item}
          </button>
        ))}
      </div>
      <p className="text-2xl font-bold text-yellow-400 mt-8">⭐ النقاط: {score}</p>
    </div>
  );
}
