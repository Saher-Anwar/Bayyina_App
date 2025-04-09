import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

type WordProps = {
  word: string;
  chapter: number;
  verse: number;
  index: number;
  isSelected: boolean;
  onSelect: (details: {
    word: string;
    chapter: number;
    verse: number;
    index: number;
  }) => void;
};

export const Word: React.FC<WordProps> = ({ word, chapter, verse, index, isSelected, onSelect }) => {
  return (
    <Pressable onPress={() => onSelect({ word, chapter, verse, index })}>
      <Text style={[styles.word, isSelected && styles.selected]}>
        {word}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  word: {
    fontSize: 26,
    color: '#FFFFFF',
    fontFamily: 'ScheherazadeNew_400Regular',
    marginHorizontal: 4,
  },
  selected: {
    backgroundColor: '#FFD70033', // light gold highlight
    borderRadius: 4,
  },
});
