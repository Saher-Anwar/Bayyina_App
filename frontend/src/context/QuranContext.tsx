import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Chapter, Verse } from '../types';
import { mockChapters, mockVerses } from '../services/mockData';

interface QuranContextType {
  chapters: Chapter[];
  selectedChapter: Chapter | null;
  verses: Verse[];
  setSelectedChapter: (chapter: Chapter) => void;
}

const QuranContext = createContext<QuranContextType | undefined>(undefined);

export const QuranProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chapters] = useState<Chapter[]>(mockChapters);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);

  React.useEffect(() => {
    if (selectedChapter) {
      setVerses(mockVerses[selectedChapter.id] || []);
    }
  }, [selectedChapter]);

  return (
    <QuranContext.Provider value={{ chapters, selectedChapter, verses, setSelectedChapter }}>
      {children}
    </QuranContext.Provider>
  );
};

export const useQuran = (): QuranContextType => {
  const context = useContext(QuranContext);
  if (context === undefined) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
};
