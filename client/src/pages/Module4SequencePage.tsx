import React, { useState } from 'react';

export default function Module4SequencePage() {
  const [level, setLevel] = useState<1 | 2>(1);
  const [score, setScore] = useState(0);
  const [sequence, setSequence] = useState(level === 1 ? ['1️⃣', '2️⃣', '3️⃣'] : ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">🔄 التتابع البصري</h1>
      <p className="text-gray-300 mb-8">رتب الأرقام بالترتيب الصحيح</p>
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
        {sequence.map((item, idx) => (
          <button key={idx} className="text-6xl p-8 bg-slate-700 hover:bg-slate-600 rounded-lg">
            {item}
          </button>
        ))}
      </div>
      <p className="text-2xl font-bold text-yellow-400">⭐ النقاط: {score}</p>
    </div>
  );
}
