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
      <View style={styles.surahHeader}>
        <Text style={styles.surahName}>{name}</Text>
      </View>
      <AyahLine ayat={ayat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  surahHeader: {
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#1C1C1C',
    alignSelf: 'center',
  },
  surahName: {
    fontSize: 28,
    fontFamily: 'ScheherazadeNew_700Bold',
    color: '#FFD700',
    textAlign: 'center',
  },
});
