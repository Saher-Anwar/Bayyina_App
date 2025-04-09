import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

type AyahLineProps = {
  ayat: string[][];
  onWordPress: (info: { word: string; surahNumber: number; verseNumber: number; wordIndex: number }) => void;
  surahNumber: number;
  selectedWordInfo: {
    surahNumber: number;
    verseNumber: number;
    wordIndex: number;
  } | null;
};

export const AyahLine: React.FC<AyahLineProps> = ({
  ayat,
  onWordPress,
  surahNumber,
  selectedWordInfo,
}) => {
  return (
    <View style={styles.container}>
      {/* Render all words in a single row (RTL) */}
      <View style={styles.wordsContainer}>
        {ayat.map((words, verseIndex) => (
          <React.Fragment key={verseIndex}>
            {words.map((word, wordIndex) => {
              const isSelected =
                selectedWordInfo?.surahNumber === surahNumber &&
                selectedWordInfo?.verseNumber === verseIndex &&
                selectedWordInfo?.wordIndex === wordIndex;

              return (
                <Pressable
                  key={`${verseIndex}-${wordIndex}`}
                  onPress={() =>
                    onWordPress({ word, surahNumber, verseNumber: verseIndex, wordIndex })
                  }>
                  <Text style={[styles.word, isSelected && styles.highlight]}>{word}</Text>
                </Pressable>
              );
            })}
            {/* Ayah end marker (smaller and subtle) */}
            <Text style={styles.ayahEnd}> ۝ </Text>
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
  ayahEnd: {
    fontSize: 18,
    color: '#AAAAAA',
    marginHorizontal: 2, // Reduce spacing
  },
});