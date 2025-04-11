import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

interface WordSelectorProps {
  text: string;
  onWordSelect: (word: string) => void;
}

const WordSelector: React.FC<WordSelectorProps> = ({ text, onWordSelect }) => {
  // Split text into words - a simple split by space for demonstration
  // In a real app, you would need proper Arabic word segmentation
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
    marginLeft: 4,
    marginBottom: 4,
  },
  wordText: {
    fontSize: 22,
    lineHeight: 36,
    fontFamily: 'System',
  },
});

export default WordSelector;