import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Shape {
  id: string;
  type: 'square' | 'circle' | 'triangle';
  color: string;
  size: 'small' | 'medium' | 'large';
}

export function AdvancedShapeMatching({ difficulty = 'beginner' }: { difficulty?: string }) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [targetShape, setTargetShape] = useState<Shape | null>(null);
  const [answered, setAnswered] = useState(false);

  // Generate shapes based on difficulty
  useEffect(() => {
    const shapeCount = difficulty === 'beginner' ? 3 : difficulty === 'intermediate' ? 5 : 7;
    const newShapes = generateShapes(shapeCount);
    setShapes(newShapes);
    setTargetShape(newShapes[Math.floor(Math.random() * newShapes.length)]);
  }, [difficulty, level]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, answered]);

  const generateShapes = (count: number): Shape[] => {
    const types: Array<'square' | 'circle' | 'triangle'> = ['square', 'circle', 'triangle'];
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

    return Array.from({ length: count }, (_, i) => ({
      id: `shape-${i}`,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
    }));
  };

  const handleShapeClick = (shape: Shape) => {
    if (!answered && targetShape) {
      const isCorrect = shape.id === targetShape.id;
      if (isCorrect) {
        setScore(score + 10 * level);
        setLevel(level + 1);
      }
      setAnswered(true);
    }
  };

  const renderShape = (shape: Shape) => {
    const sizeMap = { small: 'w-12 h-12', medium: 'w-16 h-16', large: 'w-20 h-20' };
    const radiusMap = { square: 'rounded-lg', circle: 'rounded-full', triangle: '' };

    if (shape.type === 'triangle') {
      return (
        <div
          className="border-l-8 border-r-8 border-b-16"
          style={{
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: shape.color.replace('bg-', ''),
            width: 0,
            height: 0,
          }}
        />
      );
    }

    return (
      <div
        className={`${sizeMap[shape.size]} ${shape.color} ${radiusMap[shape.type]} shadow-lg`}
      />
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="p-8 bg-white rounded-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0d1b2a]">التمييز البصري المتقدم</h2>
            <p className="text-gray-500">المستوى {level}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">الوقت المتبقي</p>
            <p className="text-3xl font-bold text-[#4dd9e0]">{timeLeft}s</p>
          </div>
        </div>

        <div className="mb-8 p-6 bg-[#f0f9ff] rounded-2xl border-2 border-[#4dd9e0]">
          <p className="text-center text-gray-600 mb-4">ابحث عن الشكل المطابق:</p>
          <div className="flex justify-center">
            {targetShape && renderShape(targetShape)}
          </div>
        </div>

        <div className={`grid grid-cols-3 md:grid-cols-${difficulty === 'beginner' ? 3 : 5} gap-4 mb-8`}>
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => handleShapeClick(shape)}
              disabled={answered}
              className="p-4 border-2 border-yellow-300 rounded-2xl hover:bg-yellow-50 transition-all flex items-center justify-center"
            >
              {renderShape(shape)}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-[#4dd9e0]">النقاط: {score}</p>
          {answered && (
            <Button
              onClick={() => {
                setAnswered(false);
                setTimeLeft(30);
              }}
              className="bg-[#4dd9e0] hover:bg-[#3bc8cf] text-[#0d1b2a] font-bold px-6 py-2 rounded-full"
            >
              التالي
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
