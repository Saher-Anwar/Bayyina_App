import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Verse } from '../types';
import WordSelector from './WordSelector';
import { colors } from '../theme/colors';

interface VerseItemProps {
  verse: Verse;
  onWordSelect: (word: string) => void;
}

const VerseItem: React.FC<VerseItemProps> = ({ verse, onWordSelect }) => {
  return (
    <View style={styles.container}>
      <View style={styles.verseNumberContainer}>
        <Text style={styles.verseNumber}>{verse.verseNumber}</Text>
      </View>
      <View style={styles.textContainer}>
        <WordSelector text={verse.text} onWordSelect={onWordSelect} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  verseNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  verseNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  textContainer: {
    flex: 1,
  },
});

export default VerseItem;
