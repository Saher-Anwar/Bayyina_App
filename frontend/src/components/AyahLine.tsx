import React from 'react';
import { Text, StyleSheet } from 'react-native';

type AyahLineProps = {
  ayat: string[];
};

export const AyahLine: React.FC<AyahLineProps> = ({ ayat }) => {
  return (
    <Text style={styles.ayahText}>
      {ayat.map((ayah, index) => (
        <Text key={index}>
          {ayah} <Text style={styles.ayahEnd}>۝</Text>{' '}
        </Text>
      ))}
    </Text>
  );
};

const styles = StyleSheet.create({
  ayahText: {
    fontSize: 26,
    writingDirection: 'rtl',
    textAlign: 'right',
    color: '#FFFFFF',
    fontFamily: 'Scheherazade_400Regular',
    lineHeight: 40,
  },
  ayahEnd: {
    fontSize: 18,
    color: '#AAAAAA',
  },
});
