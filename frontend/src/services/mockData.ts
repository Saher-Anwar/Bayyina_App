import { Chapter, Verse, Word } from '../types';

export const mockChapters: Chapter[] = [
  {
    id: 1,
    name: 'Al-Fatihah',
    arabicName: 'الفاتحة',
    versesCount: 7
  },
  {
    id: 2,
    name: 'Al-Baqarah',
    arabicName: 'البقرة',
    versesCount: 286
  },
  {
    id: 3,
    name: 'Aal-E-Imran',
    arabicName: 'آل عمران',
    versesCount: 200
  },
  {
    id: 4,
    name: 'An-Nisa',
    arabicName: 'النساء',
    versesCount: 176
  },
  {
    id: 5,
    name: 'Al-Ma\'idah',
    arabicName: 'المائدة',
    versesCount: 120
  }
];

export const mockVerses: Record<number, Verse[]> = {
  1: [
    {
      id: 1,
      chapterId: 1,
      verseNumber: 1,
      pageNumber: 1,
      text: 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ'
    },
    {
      id: 2,
      chapterId: 1,
      verseNumber: 2,
      pageNumber: 1,
      text: 'ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَـٰلَمِينَ'
    },
    {
      id: 3,
      chapterId: 1,
      verseNumber: 3,
      pageNumber: 1,
      text: 'ٱلرَّحۡمَـٰنِ ٱلرَّحِيمِ'
    },
    {
      id: 4,
      chapterId: 1,
      verseNumber: 4,
      pageNumber: 1,
      text: 'مَـٰلِكِ يَوۡمِ ٱلدِّينِ'
    },
    {
      id: 5,
      chapterId: 1,
      verseNumber: 5,
      pageNumber: 1,
      text: 'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ'
    },
    {
      id: 6,
      chapterId: 1,
      verseNumber: 6,
      pageNumber: 1,
      text: 'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ'
    },
    {
      id: 7,
      chapterId: 1,
      verseNumber: 7,
      pageNumber: 1,
      text: 'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ'
    }
  ],
  2: [
    {
      id: 8,
      chapterId: 2,
      verseNumber: 1,
      pageNumber: 2,
      text: 'الٓمٓ'
    },
    {
      id: 9,
      chapterId: 2,
      verseNumber: 2,
      pageNumber: 2,
      text: 'ذَٰلِكَ ٱلۡكِتَـٰبُ لَا رَيۡبَۛ فِيهِۛ هُدًى لِّلۡمُتَّقِينَ'
    },
    {
      id: 10,
      chapterId: 2,
      verseNumber: 3,
      pageNumber: 2,
      text: 'ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقۡنَـٰهُمۡ يُنفِقُونَ'
    }
  ]
};

export const getWordDetails = (text: string): Word => {
  // Mock function to provide word details
  // In a real app, this would query your backend API
  const wordMapping: Record<string, Word> = {
    'بِسۡمِ': {
      id: 1,
      text: 'بِسۡمِ',
      root: 'س م و',
      gender: 'masculine',
      number: 'singular'
    },
    'ٱللَّهِ': {
      id: 2,
      text: 'ٱللَّهِ',
      root: 'ا ل ه',
      gender: 'masculine',
      number: 'singular'
    },
    'ٱلرَّحۡمَـٰنِ': {
      id: 3,
      text: 'ٱلرَّحۡمَـٰنِ',
      root: 'ر ح م',
      gender: 'masculine',
      number: 'singular'
    },
    'ٱلرَّحِيمِ': {
      id: 4,
      text: 'ٱلرَّحِيمِ',
      root: 'ر ح م',
      gender: 'masculine',
      number: 'singular'
    }
  };

  return wordMapping[text] || {
    id: Math.floor(Math.random() * 1000),
    text: text,
    root: 'Example root',
    gender: 'masculine',
    number: 'singular'
  };
};
