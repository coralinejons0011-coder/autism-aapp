import React, { createContext, useState, useCallback } from 'react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  completed: number;
  total: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  score: number;
  achievements: Achievement[];
}

interface ProgressContextType {
  totalPoints: number;
  modules: ModuleProgress[];
  achievements: Achievement[];
  updateModuleProgress: (moduleId: string, score: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  getProgressPercentage: () => number;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [totalPoints, setTotalPoints] = useState(0);
  const [modules, setModules] = useState<ModuleProgress[]>([
    { moduleId: '1', moduleName: 'التمييز البصري', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
    { moduleId: '2', moduleName: 'التنظيم المكاني', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
    { moduleId: '3', moduleName: 'الذاكرة البصرية', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
    { moduleId: '4', moduleName: 'التتابع البصري', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
    { moduleId: '5', moduleName: 'الإغلاق البصري', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
    { moduleId: '6', moduleName: 'التناسق الحركي', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
    { moduleId: '7', moduleName: 'الشكل والخلفية', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
    { moduleId: '8', moduleName: 'الثبات الشكلي', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
  ]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const updateModuleProgress = useCallback((moduleId: string, score: number) => {
    setModules(modules.map(m => {
      if (m.moduleId === moduleId) {
        const newCompleted = Math.min(m.completed + 1, m.total);
        const newScore = m.score + score;
        return {
          ...m,
          completed: newCompleted,
          score: newScore,
          level: newScore > 500 ? 'advanced' : newScore > 250 ? 'intermediate' : 'beginner',
        };
      }
      return m;
    }));
    setTotalPoints(totalPoints + score);
  }, [modules, totalPoints]);

  const unlockAchievement = useCallback((achievement: Achievement) => {
    if (!achievements.find(a => a.id === achievement.id)) {
      setAchievements([...achievements, { ...achievement, unlockedAt: new Date() }]);
    }
  }, [achievements]);

  const getProgressPercentage = useCallback(() => {
    const totalCompleted = modules.reduce((sum, m) => sum + m.completed, 0);
    const totalActivities = modules.reduce((sum, m) => sum + m.total, 0);
    return Math.round((totalCompleted / totalActivities) * 100);
  }, [modules]);

  return (
    <ProgressContext.Provider value={{ totalPoints, modules, achievements, updateModuleProgress, unlockAchievement, getProgressPercentage }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = React.useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
