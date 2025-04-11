// Modified ChapterList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuran } from '../context/QuranContext';
import { Chapter } from '../types';

const ChapterList = () => {
  const { chapters, setSelectedChapter } = useQuran();

  const renderItem = ({ item }: { item: Chapter }) => (
    <TouchableOpacity 
      style={styles.chapterItem} 
      onPress={() => setSelectedChapter(item)}
    >
      <Text style={styles.chapterNumber}>{item.id}</Text>
      <View style={styles.chapterNameContainer}>
        <Text style={styles.chapterName}>{item.name}</Text>
        <Text style={styles.arabicName}>{item.arabicName}</Text>
      </View>
      <Text style={styles.versesCount}>{item.versesCount} verses</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chapters (Surahs)</Text>
      <FlatList
        data={chapters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

// styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#e9ecef',
  },
  listContent: {
    paddingBottom: 20,
  },
  chapterItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    alignItems: 'center',
  },
  chapterNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 30,
  },
  chapterNameContainer: {
    flex: 1,
  },
  chapterName: {
    fontSize: 16,
    fontWeight: '500',
  },
  arabicName: {
    fontSize: 18,
    marginTop: 4,
    textAlign: 'right',
  },
  versesCount: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default ChapterList;
