export interface Chapter {
    id: number;
    name: string;
    arabicName: string;
    versesCount: number;
  }
  
  export interface Verse {
    id: number;
    chapterId: number;
    verseNumber: number;
    pageNumber: number;
    text: string;
  }
  
  export interface Word {
    id: number;
    text: string;
    root: string;
    gender: 'masculine' | 'feminine' | 'neuter';
    number: 'singular' | 'dual' | 'plural';
  }
  