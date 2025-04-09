import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';

type Ayah = {
  surah: number;
  ayah: number;
  text: string;
};

export default function App() {
  const [quranData, setQuranData] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data simulating your API response
  const mockQuranAPI = async (): Promise<Ayah[]> => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve([
          { surah: 1, ayah: 1, text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
          { surah: 1, ayah: 2, text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
          { surah: 1, ayah: 3, text: 'الرَّحْمَٰنِ الرَّحِيمِ' },
          { surah: 1, ayah: 4, text: 'مَالِكِ يَوْمِ الدِّينِ' },
          { surah: 1, ayah: 5, text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ' },
        ]);
      }, 1000)
    );
  };

  useEffect(() => {
    mockQuranAPI().then((data) => {
      setQuranData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#00aa00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={quranData}
        keyExtractor={(item) => `${item.surah}:${item.ayah}`}
        renderItem={({ item }) => (
          <Text style={styles.ayahText}>
            <Text style={styles.ayahNumber}>({item.surah}:{item.ayah}) </Text>
            {item.text}
          </Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  ayahText: {
    fontSize: 22,
    marginBottom: 16,
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  ayahNumber: {
    fontSize: 16,
    color: '#555',
  },
});
