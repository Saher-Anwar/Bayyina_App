import React, { useState, useCallback } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Surah } from './src/components/Surah';
import { mockQuranData } from './src/data/mockQuran';

type SurahType = {
  surahNumber: number;
  name: string;
  ayat: string[];
};

export default function App() {
  const [data, setData] = useState<SurahType[]>(mockQuranData.slice(0, 1));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.surahNumber.toString()}
        renderItem={({ item }) => <Surah name={item.name} ayat={item.ayat} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
});
