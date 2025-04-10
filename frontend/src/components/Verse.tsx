import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

type VerseProps = {
  verses: string[][];
  onWordPress: (info: { word: string; chapterNumber: number; verseNumber: number; wordIndex: number }) => void;
  chapterNumber: number;
  selectedWordInfo: {
    chapterNumber: number;
    verseNumber: number;
    wordIndex: number;
  } | null;
};

export const Verse: React.FC<VerseProps> = ({
  verses: verses,
  onWordPress,
  chapterNumber,
  selectedWordInfo,
}) => {
  return (
    <View style={styles.container}>
      {/* Render all words in a single row (RTL) */}
      <View style={styles.wordsContainer}>

        {verses.map((words, verseIndex) => (
          <React.Fragment key={verseIndex}>
            {words.map((word, wordIndex) => {
              const isSelected =
                selectedWordInfo?.chapterNumber === chapterNumber &&
                selectedWordInfo?.verseNumber === verseIndex &&
                selectedWordInfo?.wordIndex === wordIndex;

              return (
                <Pressable
                  key={`${verseIndex}-${wordIndex}`}
                  onPress={() =>
                    onWordPress({ word, chapterNumber, verseNumber: verseIndex, wordIndex })
                  }>
                  <Text style={[styles.word, isSelected && styles.highlight]}>{word}</Text>
                </Pressable>
              );
            })}
            {/* Verse end marker (smaller and subtle) */}
            <Text style={styles.verseEnd}> ۝ </Text>
          </React.Fragment>
        ))}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse', // RTL flow
    flexWrap: 'wrap', // Allow wrapping if needed
  },
  wordsContainer: {
    flexDirection: 'row-reverse', // Arabic is RTL
    flexWrap: 'wrap', // Wrap to next line if content overflows
    alignItems: 'center', // Center-align words vertically
  },
  word: {
    fontSize: 26,
    color: '#FFFFFF',
    fontFamily: 'Scheherazade_400Regular',
    marginHorizontal: 2, // Reduce spacing between words
  },
  highlight: {
    backgroundColor: '#FFD700',
    color: '#000',
    borderRadius: 4,
    paddingHorizontal: 2,
  },
  verseEnd: {
    fontSize: 18,
    color: '#AAAAAA',
    marginHorizontal: 2, // Reduce spacing
  },
});