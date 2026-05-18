import React, { useState } from 'react';

export default function Module6MotorPage() {
  const [level, setLevel] = useState<1 | 2>(1);
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">🎯 التناسق البصري الحركي</h1>
      <p className="text-gray-300 mb-8">اتبع المسار بدقة</p>
      <svg width="300" height="300" className="mx-auto mb-8">
        <path d="M 50 50 L 250 250" stroke="cyan" strokeWidth="4" fill="none" />
      </svg>
      <p className="text-gray-400 mb-8">اسحب المؤشر على المسار</p>
      <p className="text-2xl font-bold text-yellow-400">⭐ النقاط: {score}</p>
    </div>
  );
}
