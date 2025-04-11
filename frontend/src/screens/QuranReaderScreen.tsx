import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useQuran } from '../context/QuranContext';
import VerseItem from '../components/VerseItem';
import WordDetailsModal from '../components/WordDetailsModal';
import { Word } from '../types';
import { getWordDetails } from '../services/mockData';
import { colors } from '../theme/colors';

const QuranReaderScreen: React.FC = () => {
  const { selectedChapter, verses } = useQuran();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  const handleWordSelect = (wordText: string) => {
    const wordDetails = getWordDetails(wordText);
    setSelectedWord(wordDetails);
    setModalVisible(true);
  };

  if (!selectedChapter) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Select a chapter from the side panel</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.chapterTitle}>
          {selectedChapter.id}. {selectedChapter.name}
        </Text>
        <Text style={styles.chapterArabicTitle}>{selectedChapter.arabicName}</Text>
      </View>
      
      <FlatList
        data={verses}
        renderItem={({ item }) => (
          <VerseItem verse={item} onWordSelect={handleWordSelect} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.versesList}
        style={styles.versesContainer}
      />
      
      <WordDetailsModal
        visible={modalVisible}
        word={selectedWord}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  chapterArabicTitle: {
    fontSize: 28,
    fontWeight: '500',
    marginTop: 8,
    color: colors.primary,
  },
  versesContainer: {
    flex: 1,
  },
  versesList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  emptyText: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default QuranReaderScreen;
