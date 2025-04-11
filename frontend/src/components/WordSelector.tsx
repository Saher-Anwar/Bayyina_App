import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

interface WordSelectorProps {
  text: string;
  onWordSelect: (word: string) => void;
}

const WordSelector: React.FC<WordSelectorProps> = ({ text, onWordSelect }) => {
  // Split text into words
  const words = text.split(' ');
  
  return (
    <View style={styles.container}>
      {words.map((word, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => onWordSelect(word)}
          style={styles.wordContainer}
        >
          <Text style={styles.wordText}>{word}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse', // Arabic reads right-to-left
    flexWrap: 'wrap',
  },
  wordContainer: {
    marginLeft: 6,
    marginBottom: 8,
    padding: 2,
  },
  wordText: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'System',
    color: colors.text,
  },
});

export default WordSelector;
