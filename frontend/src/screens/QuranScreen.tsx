import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchChapter } from '../api/quran';

type VerseProps = {
  item: string;
  index: number;
};

const VerseCard: React.FC<VerseProps> = ({ item, index }) => (
  <View style={styles.verseCard}>
    <Text style={styles.verseText}>{item}</Text>
  </View>
);

const QuranScreen = () => {
  const [verses, setVerses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [chapterNumber, setChapterNumber] = useState(114); // Default to Surah An-Naas

  useEffect(() => {
    fetchChapter(chapterNumber)
      .then(data => {
        setVerses(data.verses);
      })
      .finally(() => setLoading(false));
  }, [chapterNumber]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={verses}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => <VerseCard item={item} index={index} />}
        contentContainerStyle={styles.verseList}
      />
    </View>
  );
};

export default QuranScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  verseList: {
    paddingBottom: 32,
  },
  verseCard: {
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  verseText: {
    fontSize: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
