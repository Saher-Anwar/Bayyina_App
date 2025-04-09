import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AyahLine } from './AyahLine';

type SurahProps = {
  name: string;
  ayat: string[];
};

export const Surah: React.FC<SurahProps> = ({ name, ayat }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.surahName}>{name}</Text>
      <AyahLine ayat={ayat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  surahName: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 16,
    borderBottomWidth: 2,
    borderColor: '#ddd',
    paddingBottom: 8,
  },
});
