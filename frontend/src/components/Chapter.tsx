import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Verse } from './Verse';

type ChapterProps = {
  name: string;
  verses: string[][];
  chapterNumber: number;
  onWordPress: (info: { word: string; chapterNumber: number; verseNumber: number; wordIndex: number }) => void;
  selectedWordInfo: { chapterNumber: number; verseNumber: number; wordIndex: number } | null;
};

export const Chapter: React.FC<ChapterProps> = ({ name, verses: verse, chapterNumber: chapterNumber, onWordPress, selectedWordInfo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.chapterHeader}>
        <Text style={styles.chapterName}>{name}</Text>
      </View>
      <Verse
        verses={verse}
        onWordPress={onWordPress}
        chapterNumber={chapterNumber}
        selectedWordInfo={selectedWordInfo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  chapterHeader: {
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#1C1C1C',
    alignSelf: 'center',
  },
  chapterName: {
    fontSize: 28,
    fontFamily: 'ScheherazadeNew_700Bold',
    color: '#FFD700',
    textAlign: 'center',
  },
});
