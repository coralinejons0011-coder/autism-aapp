import React, { useState } from 'react';

export default function Module7FigureGroundPage() {
  const [level, setLevel] = useState<1 | 2>(1);
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">🔍 الشكل والخلفية</h1>
      <p className="text-gray-300 mb-8">جد التفاحة المخفية</p>
      <div className="bg-slate-700 p-8 rounded-lg mb-8 text-6xl">
        🍎🍊🍌🍎🍇 🍊🍓🍎🍌🍊 🍇🍎🍌🍓🍊
      </div>
      <p className="text-gray-400 mb-8">اضغط على التفاحة</p>
      <p className="text-2xl font-bold text-yellow-400">⭐ النقاط: {score}</p>
    </div>
  );
}
