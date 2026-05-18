import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ScheduleTask {
  id: number;
  title: string;
  description?: string;
  icon: string;
  completed: boolean;
  order: number;
}

interface DailyVisualScheduleProps {
  tasks: ScheduleTask[];
  onTaskComplete?: (taskId: number) => void;
}

export function DailyVisualSchedule({
  tasks,
  onTaskComplete,
}: DailyVisualScheduleProps) {
  const [completedTasks, setCompletedTasks] = useState<number[]>(
    tasks.filter((t) => t.completed).map((t) => t.id)
  );

  const handleCompleteTask = (taskId: number) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks((prev) => [...prev, taskId]);
      onTaskComplete?.(taskId);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);
  const completionPercentage = Math.round(
    (completedTasks.length / tasks.length) * 100
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Today's Schedule
        </h2>
        <p className="text-lg text-muted-foreground">
          Let's complete our tasks step by step
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 bg-white rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-muted-foreground">
            Progress
          </span>
          <span className="text-sm font-bold text-primary">
            {completedTasks.length}/{tasks.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {completionPercentage}% complete
        </p>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {sortedTasks.map((task, index) => {
          const isCompleted = completedTasks.includes(task.id);
          const isCurrent =
            index === completedTasks.length &&
            completedTasks.length < tasks.length;

          return (
            <div
              key={task.id}
              className={`
                relative p-6 rounded-2xl transition-all duration-300
                ${
                  isCompleted
                    ? "bg-primary/10 border-2 border-primary"
                    : isCurrent
                      ? "bg-white border-2 border-secondary shadow-lg scale-105"
                      : "bg-white border-2 border-muted"
                }
              `}
            >
              {/* Step Number */}
              <div
                className={`
                  absolute -left-4 -top-4 w-10 h-10 rounded-full
                  flex items-center justify-center font-bold text-white
                  ${isCompleted ? "bg-primary" : isCurrent ? "bg-secondary" : "bg-muted"}
                `}
              >
                {index + 1}
              </div>

              {/* Content */}
              <div className="pl-8 pr-16">
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-4xl">{task.icon}</span>
                  <div className="flex-1">
                    <h3
                      className={`
                        text-xl font-bold transition-all duration-300
                        ${
                          isCompleted
                            ? "text-primary line-through opacity-60"
                            : "text-foreground"
                        }
                      `}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Completion Button */}
                {!isCompleted && (
                  <Button
                    onClick={() => handleCompleteTask(task.id)}
                    className={`
                      mt-4 w-full calm-button-hover
                      ${
                        isCurrent
                          ? "bg-secondary hover:bg-secondary/90"
                          : "bg-muted hover:bg-muted/80"
                      }
                    `}
                  >
                    {isCurrent ? "Complete This Task" : "Mark Complete"}
                  </Button>
                )}

                {/* Completed Indicator */}
                {isCompleted && (
                  <div className="flex items-center gap-2 text-primary font-semibold mt-4">
                    <Check size={20} />
                    <span>Completed!</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {completedTasks.length === tasks.length && (
        <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center slide-up-calm">
          <p className="text-2xl font-bold text-primary mb-2">
            🎉 All Done!
          </p>
          <p className="text-lg text-muted-foreground">
            Great job completing all your tasks today!
          </p>
        </div>
      )}
    </div>
  );
}
