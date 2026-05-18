import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RewardSystem } from "./RewardSystem";

interface Emotion {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

const emotions: Emotion[] = [
  { id: "happy", name: "Happy", emoji: "😊", description: "Smiling face" },
  { id: "sad", name: "Sad", emoji: "😢", description: "Crying face" },
  { id: "angry", name: "Angry", emoji: "😠", description: "Angry face" },
  { id: "surprised", name: "Surprised", emoji: "😮", description: "Surprised face" },
  { id: "calm", name: "Calm", emoji: "😌", description: "Peaceful face" },
];

interface EmotionsRecognitionActivityProps {
  childId?: number;
  onComplete?: (correctAnswers: number, totalQuestions: number) => void;
}

export function EmotionsRecognitionActivity({
  childId,
  onComplete,
}: EmotionsRecognitionActivityProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const questions = [
    { question: "Which face is happy?", correctId: "happy" },
    { question: "Which face is sad?", correctId: "sad" },
    { question: "Which face is angry?", correctId: "angry" },
    { question: "Which face is surprised?", correctId: "surprised" },
    { question: "Which face is calm?", correctId: "calm" },
  ];

  const currentQ = questions[currentQuestion];
  
  // Ensure correct answer is always included
  const correctEmotion = emotions.find((e) => e.id === currentQ.correctId)!;
  const otherEmotions = emotions.filter((e) => e.id !== currentQ.correctId);
  const randomOthers = otherEmotions
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  const emotionOptions = [correctEmotion, ...randomOthers].sort(
    () => Math.random() - 0.5
  );

  const handleAnswer = (emotionId: string) => {
    if (answered) return;

    setSelectedAnswer(emotionId);
    setAnswered(true);

    if (emotionId === currentQ.correctId) {
      setCorrectAnswers((prev) => prev + 1);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        // Activity complete
        setShowReward(true);
      }
    }, 1500);
  };

  const handleRewardComplete = () => {
    setShowReward(false);
    onComplete?.(correctAnswers, questions.length);
  };

  if (showReward) {
    return (
      <RewardSystem
        isVisible={true}
        starsEarned={Math.ceil((correctAnswers / questions.length) * 3)}
        message={`You got ${correctAnswers} out of ${questions.length} correct!`}
        onComplete={handleRewardComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="flex gap-2 justify-center">
            {Array.from({ length: questions.length }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i < currentQuestion
                    ? "bg-primary w-8"
                    : i === currentQuestion
                      ? "bg-secondary w-8"
                      : "bg-muted w-6"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8 text-center slide-up-calm">
          <h2 className="text-3xl font-bold text-primary mb-8">
            {currentQ.question}
          </h2>

          {/* Emotion Options */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {emotionOptions.map((emotion) => (
              <button
                key={emotion.id}
                onClick={() => handleAnswer(emotion.id)}
                disabled={answered}
                className={`
                  relative p-8 rounded-2xl transition-all duration-300
                  ${
                    selectedAnswer === emotion.id
                      ? emotion.id === currentQ.correctId
                        ? "bg-primary/20 ring-4 ring-primary scale-105"
                        : "bg-destructive/20 ring-4 ring-destructive scale-95"
                      : "bg-muted hover:bg-muted/80"
                  }
                  ${answered ? "cursor-not-allowed" : "cursor-pointer hover:scale-105"}
                  disabled:opacity-75
                `}
              >
                <div className="text-6xl mb-4">{emotion.emoji}</div>
                <p className="text-sm font-semibold text-foreground">
                  {emotion.name}
                </p>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {answered && (
            <div
              className={`
                text-lg font-semibold p-4 rounded-xl
                ${
                  selectedAnswer === currentQ.correctId
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive"
                }
              `}
            >
              {selectedAnswer === currentQ.correctId
                ? "Correct! Great job!"
                : "Try again next time!"}
            </div>
          )}
        </div>

        {/* Skip Button */}
        {!answered && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => handleAnswer("")}
              className="calm-button-hover"
            >
              Skip
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
