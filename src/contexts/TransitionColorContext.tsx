import { createContext, useContext, useState, ReactNode } from 'react';

type TransitionColorContextType = {
  transitionColor: 'bg-secondary-200' | 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500';
  setTransitionColor: (color: 'bg-secondary-200' | 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500') => void;
};

const TransitionColorContext = createContext<TransitionColorContextType | undefined>(undefined);

type TransitionColorProviderProps = {
  children: ReactNode;
};

export function TransitionColorProvider({ children }: TransitionColorProviderProps) {
  const [transitionColor, setTransitionColor] = useState<'bg-secondary-200' | 'bg-tetriary-100' | 'bg-tetriary-200' | 'bg-tetriary-300' | 'bg-tetriary-400' | 'bg-tetriary-500'>('bg-secondary-200');

  return (
    <TransitionColorContext.Provider value={{ transitionColor, setTransitionColor }}>
      {children}
    </TransitionColorContext.Provider>
  );
}

export function useTransitionColor() {
  const context = useContext(TransitionColorContext);
  if (!context) {
    throw new Error('useTransitionColor must be used within a TransitionColorProvider');
  }
  return context;
}