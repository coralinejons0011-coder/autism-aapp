import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface SpatialItem {
  id: string;
  emoji: string;
  correctPosition: 'top' | 'bottom' | 'left' | 'right' | 'inside' | 'outside';
  label: string;
}

export default function Module2SpatialPage() {
  const [level, setLevel] = useState<1 | 2>(1);
  const [score, setScore] = useState(0);

  const level1Tasks = [
    { instruction: 'ضع الكرة فوق الصندوق', emoji: '🔵', position: 'top' },
    { instruction: 'ضع الكرة تحت الصندوق', emoji: '🔵', position: 'bottom' },
  ];

  const level2Tasks = [
    { instruction: 'ضع الكرة داخل الصندوق', emoji: '🔵', position: 'inside' },
    { instruction: 'ضع الكرة خارج الصندوق', emoji: '🔵', position: 'outside' },
  ];

  const tasks = level === 1 ? level1Tasks : level2Tasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">🗺️ التنظيم البصري المكاني</h1>
          <p className="text-gray-300">ضع الأشكال في المواضع الصحيحة</p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setLevel(1)}
              className={`px-6 py-2 rounded-lg font-bold transition ${
                level === 1
                  ? 'bg-cyan-400 text-slate-900'
                  : 'bg-slate-700 text-gray-300'
              }`}
            >
              المستوى 1
            </button>
            <button
              onClick={() => setLevel(2)}
              className={`px-6 py-2 rounded-lg font-bold transition ${
                level === 2
                  ? 'bg-cyan-400 text-slate-900'
                  : 'bg-slate-700 text-gray-300'
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

        {/* Tasks */}
        <div className="space-y-8">
          {tasks.map((task, idx) => (
            <div key={idx} className="bg-slate-700 p-8 rounded-lg">
              <p className="text-2xl font-bold text-cyan-400 mb-6 text-center">{task.instruction}</p>
              
              {/* Spatial Layout */}
              <div className="flex flex-col items-center gap-4">
                {/* Top */}
                {task.position === 'top' && (
                  <div className="text-6xl mb-4">🔵</div>
                )}
                
                {/* Box */}
                <div className="bg-slate-600 w-40 h-40 border-4 border-cyan-400 rounded-lg flex items-center justify-center">
                  {task.position === 'inside' && <div className="text-6xl">🔵</div>}
                  {!['top', 'bottom', 'inside', 'outside'].includes(task.position) && (
                    <p className="text-gray-400">صندوق</p>
                  )}
                </div>
                
                {/* Bottom */}
                {task.position === 'bottom' && (
                  <div className="text-6xl mt-4">🔵</div>
                )}
                
                {/* Outside */}
                {task.position === 'outside' && (
                  <div className="text-6xl mt-4">🔵</div>
                )}
              </div>

              <button
                onClick={() => setScore(score + 10)}
                className="mt-6 w-full bg-cyan-400 text-slate-900 py-3 rounded-lg font-bold hover:bg-cyan-300"
              >
                ✓ صحيح!
              </button>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
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
