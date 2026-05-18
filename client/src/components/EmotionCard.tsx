interface EmotionCardProps {
  emoji: string;
  name: string;
  description: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isAnswered: boolean;
  onClick: () => void;
}

export function EmotionCard({
  emoji,
  name,
  description,
  isSelected,
  isCorrect,
  isAnswered,
  onClick,
}: EmotionCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      className={`
        relative p-8 rounded-2xl transition-all duration-300
        ${
          isSelected
            ? isCorrect
              ? "bg-primary/20 ring-4 ring-primary scale-105"
              : "bg-destructive/20 ring-4 ring-destructive scale-95"
            : "bg-muted hover:bg-muted/80"
        }
        ${isAnswered ? "cursor-not-allowed" : "cursor-pointer hover:scale-105"}
        disabled:opacity-75
      `}
    >
      {/* Emoji Display */}
      <div className="text-6xl mb-4 transition-transform duration-300 hover:scale-110">
        {emoji}
      </div>

      {/* Emotion Name */}
      <p className="text-lg font-semibold text-foreground mb-2">{name}</p>

      {/* Description */}
      <p className="text-xs text-muted-foreground">{description}</p>
    </button>
  );
}
