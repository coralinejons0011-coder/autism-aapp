import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface DiscriminationItem {
  id: string;
  image: string;
  label: string;
  isTarget: boolean;
}

export default function Module1DiscriminationPage() {
  const [level, setLevel] = useState<1 | 2>(1);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Level 1: Simple shape discrimination
  const level1Items: DiscriminationItem[] = [
    { id: '1', image: '🔵', label: 'دائرة', isTarget: true },
    { id: '2', image: '🟩', label: 'مربع', isTarget: false },
    { id: '3', image: '🔵', label: 'دائرة', isTarget: true },
    { id: '4', image: '🔺', label: 'مثلث', isTarget: false },
  ];

  // Level 2: More complex discrimination
  const level2Items: DiscriminationItem[] = [
    { id: '1', image: '🍎', label: 'تفاح أحمر', isTarget: true },
    { id: '2', image: '🍊', label: 'برتقالة', isTarget: false },
    { id: '3', image: '🍎', label: 'تفاح أحمر', isTarget: true },
    { id: '4', image: '🍌', label: 'موز', isTarget: false },
  ];

  const items = level === 1 ? level1Items : level2Items;
  const targetLabel = level === 1 ? 'دائرة' : 'تفاح أحمر';

  const handleSelect = (item: DiscriminationItem) => {
    if (item.isTarget) {
      setScore(score + 10);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">👁️ التمييز البصري</h1>
          <p className="text-gray-300">اختر جميع {targetLabel}</p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setLevel(1)}
              className={`px-6 py-2 rounded-lg font-bold transition ${
                level === 1
                  ? 'bg-cyan-400 text-slate-900'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              المستوى 1
            </button>
            <button
              onClick={() => setLevel(2)}
              className={`px-6 py-2 rounded-lg font-bold transition ${
                level === 2
                  ? 'bg-cyan-400 text-slate-900'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              المستوى 2
            </button>
          </div>
        </div>

        {/* Score */}
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-yellow-400">⭐ النقاط: {score}</p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className="bg-slate-700 hover:bg-slate-600 p-8 rounded-lg transition transform hover:scale-105 border-2 border-cyan-400"
            >
              <div className="text-6xl mb-4">{item.image}</div>
              <p className="text-gray-300 text-lg">{item.label}</p>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button className="px-6 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600">
            رجوع
          </button>
          <button className="px-6 py-3 bg-cyan-400 text-slate-900 rounded-lg hover:bg-cyan-300 font-bold flex items-center gap-2">
            التالي <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
