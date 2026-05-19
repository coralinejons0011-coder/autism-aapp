import React, { createContext, useState, useCallback, useEffect } from 'react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
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
  resetProgress: () => void;
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const DEFAULT_MODULES: ModuleProgress[] = [
  { moduleId: 'shape-matching', moduleName: 'التمييز البصري', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
  { moduleId: 'spatial', moduleName: 'التنظيم المكاني', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
  { moduleId: 'memory', moduleName: 'الذاكرة البصرية', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
  { moduleId: 'sequence', moduleName: 'التتابع البصري', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
  { moduleId: 'closure', moduleName: 'الإغلاق البصري', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
  { moduleId: 'motor', moduleName: 'التناسق الحركي', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
  { moduleId: 'figure-ground', moduleName: 'الشكل والخلفية', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
  { moduleId: 'form-constancy', moduleName: 'الثبات الشكلي', completed: 0, total: 10, level: 'beginner', score: 0, achievements: [] },
];

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [totalPoints, setTotalPoints] = useState(0);
  const [modules, setModules] = useState<ModuleProgress[]>(DEFAULT_MODULES);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('vesio_progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setTotalPoints(parsed.totalPoints || 0);
        setModules(parsed.modules || DEFAULT_MODULES);
        setAchievements(parsed.achievements || []);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('vesio_progress', JSON.stringify({
      totalPoints,
      modules,
      achievements
    }));
  }, [totalPoints, modules, achievements]);

  const updateModuleProgress = useCallback((moduleId: string, score: number) => {
    setModules(prevModules => prevModules.map(m => {
      if (m.moduleId === moduleId) {
        const newCompleted = Math.min(m.completed + 1, m.total);
        const newScore = m.score + score;
        
        // Adaptive difficulty logic:
        // Beginner: 0-100 points
        // Intermediate: 101-300 points
        // Advanced: >300 points
        let newLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
        if (newScore > 300) newLevel = 'advanced';
        else if (newScore > 100) newLevel = 'intermediate';

        return {
          ...m,
          completed: newCompleted,
          score: newScore,
          level: newLevel,
        };
      }
      return m;
    }));
    setTotalPoints(prev => prev + score);
  }, []);

  const unlockAchievement = useCallback((achievement: Achievement) => {
    setAchievements(prev => {
      if (!prev.find(a => a.id === achievement.id)) {
        return [...prev, { ...achievement, unlockedAt: new Date().toISOString() }];
      }
      return prev;
    });
  }, []);

  const getProgressPercentage = useCallback(() => {
    const totalCompleted = modules.reduce((sum, m) => sum + m.completed, 0);
    const totalActivities = modules.reduce((sum, m) => sum + m.total, 0);
    return Math.round((totalCompleted / totalActivities) * 100);
  }, [modules]);

  const resetProgress = useCallback(() => {
    setTotalPoints(0);
    setModules(DEFAULT_MODULES);
    setAchievements([]);
    localStorage.removeItem('vesio_progress');
  }, []);

  return (
    <ProgressContext.Provider value={{ totalPoints, modules, achievements, updateModuleProgress, unlockAchievement, getProgressPercentage, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = React.useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
