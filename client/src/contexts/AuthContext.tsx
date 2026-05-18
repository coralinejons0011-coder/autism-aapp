import React, { createContext, useState, useCallback, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'therapist' | 'child';
  childProfiles?: ChildProfile[];
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  completedActivities: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  createChildProfile: (name: string, age: number) => Promise<void>;
  selectChildProfile: (childId: string) => void;
  currentChild: ChildProfile | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentChild, setCurrentChild] = useState<ChildProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('vesio_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'parent',
        childProfiles: [
          { id: '1', name: 'أحمد', age: 6, level: 'beginner', progress: 45, completedActivities: [] }
        ]
      };
      setUser(mockUser);
      localStorage.setItem('vesio_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string, role: string) => {
    setIsLoading(true);
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: role as 'parent' | 'therapist' | 'child',
        childProfiles: []
      };
      setUser(newUser);
      localStorage.setItem('vesio_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCurrentChild(null);
    localStorage.removeItem('vesio_user');
  }, []);

  const createChildProfile = useCallback(async (name: string, age: number) => {
    if (!user) return;
    const newChild: ChildProfile = {
      id: Date.now().toString(),
      name,
      age,
      level: 'beginner',
      progress: 0,
      completedActivities: []
    };
    const updatedUser = {
      ...user,
      childProfiles: [...(user.childProfiles || []), newChild]
    };
    setUser(updatedUser);
    localStorage.setItem('vesio_user', JSON.stringify(updatedUser));
  }, [user]);

  const selectChildProfile = useCallback((childId: string) => {
    if (user?.childProfiles) {
      const child = user.childProfiles.find(c => c.id === childId);
      if (child) setCurrentChild(child);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, createChildProfile, selectChildProfile, currentChild }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
