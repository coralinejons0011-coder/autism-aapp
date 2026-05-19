import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgress } from "@/contexts/ProgressContext";
import { RewardSystem } from "./RewardSystem";

interface CardItem {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = ["🍎", "🐶", "🚗", "🌟", "🎈", "🐱"];

export function MemoryActivity({ onComplete }: { onComplete?: () => void }) {
  const { updateModuleProgress } = useProgress();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
  }, []);

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length === 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        setMatches(matches + 1);
        if (matches + 1 === EMOJIS.length) {
          setTimeout(() => {
            updateModuleProgress('memory', Math.max(10, 50 - moves));
            setShowReward(true);
          }, 500);
        }
      } else {
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards(newCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  if (showReward) {
    return (
      <RewardSystem
        isVisible={true}
        starsEarned={moves <= 10 ? 3 : moves <= 15 ? 2 : 1}
        message={`عمل رائع! أكملت اللعبة في ${moves} محاولة!`}
        onComplete={() => {
          setShowReward(false);
          onComplete?.();
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-orange-100">
          <span className="text-gray-500 text-sm">المحاولات: </span>
          <span className="font-bold text-orange-500">{moves}</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-orange-100">
          <span className="text-gray-500 text-sm">الأزواج: </span>
          <span className="font-bold text-orange-500">{matches}/{EMOJIS.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`h-24 md:h-32 rounded-2xl text-4xl flex items-center justify-center transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? "bg-white border-2 border-orange-400 rotate-0"
                : "bg-orange-500 border-2 border-orange-600 -rotate-3 hover:rotate-0"
            } ${card.isMatched ? "opacity-50 grayscale-0" : ""}`}
          >
            {(card.isFlipped || card.isMatched) ? card.emoji : "❓"}
          </button>
        ))}
      </div>
    </div>
  );
}
