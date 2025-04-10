import React, { useState, useCallback } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { Chapter } from './src/components/Chapter';
import { mockQuranData } from './src/data/mockQuran';
import {
  useFonts,
  Scheherazade_400Regular,
  Scheherazade_700Bold,
} from '@expo-google-fonts/scheherazade';

type ChapterType = {
  chapterNumber: number;
  name: string;
  verses: string[][];
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Scheherazade_400Regular,
    Scheherazade_700Bold,
  });

  const [data, setData] = useState<ChapterType[]>(mockQuranData.slice(0, 1));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedWordInfo, setSelectedWordInfo] = useState<{
    word: string;
    chapterNumber: number;
    verseNumber: number;
    wordIndex: number;
  } | null>(null);

  const loadMore = useCallback(() => {
    if (loading || page >= mockQuranData.length) return;
    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      setData(prev => [...prev, mockQuranData[page]]);
      setPage(nextPage);
      setLoading(false);
    }, 1000);
  }, [loading, page]);

  const handleWordPress = (info: { word: string; chapterNumber: number; verseNumber: number; wordIndex: number }) => {
    setSelectedWordInfo(info);
  };

  const mockFetchWordInfo = (word: string) => {
    return `Mock info about "${word}" - root word, morphology, etc.`;
  };

  if (!fontsLoaded) {
    return <View style={styles.loadingScreen}><ActivityIndicator size="large" /></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.chapterNumber.toString()}
        renderItem={({ item }) => (
          <Chapter
            name={item.name}
            verses={item.verses}
            chapterNumber={item.chapterNumber}
            onWordPress={handleWordPress}
            selectedWordInfo={selectedWordInfo}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#FFD700" /> : null}
        contentContainerStyle={styles.contentContainer}
      />
      {selectedWordInfo && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>
            {mockFetchWordInfo(selectedWordInfo.word)}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  contentContainer: {
    padding: 16,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltip: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  tooltipText: {
    color: '#FFD700',
    fontSize: 14,
  },
});
