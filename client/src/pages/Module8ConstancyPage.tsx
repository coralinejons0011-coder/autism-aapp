import React, { useState } from 'react';

export default function Module8ConstancyPage() {
  const [level, setLevel] = useState<1 | 2>(1);
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">🔺 الثبات الشكلي</h1>
      <p className="text-gray-300 mb-8">هل هي نفس الشكل؟</p>
      <div className="flex justify-center gap-8 mb-8">
        <div className="text-8xl">🔵</div>
        <div className="text-4xl">🔵</div>
      </div>
      <p className="text-gray-400 mb-8">هي نفس الشكل لكن بأحجام مختلفة</p>
      <div className="flex gap-4 justify-center">
        <button className="px-6 py-3 bg-cyan-400 text-slate-900 rounded-lg font-bold">نعم</button>
        <button className="px-6 py-3 bg-slate-700 text-gray-300 rounded-lg">لا</button>
      </div>
      <p className="text-2xl font-bold text-yellow-400 mt-8">⭐ النقاط: {score}</p>
    </div>
  );
}
