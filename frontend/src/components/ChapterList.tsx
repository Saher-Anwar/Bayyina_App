// src/components/ChapterList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuran } from '../context/QuranContext';
import { Chapter } from '../types';
import { colors } from '../theme/colors';

const ChapterList = () => {
  const { chapters, setSelectedChapter, selectedChapter } = useQuran();

  const renderItem = ({ item }: { item: Chapter }) => {
    const isSelected = selectedChapter?.id === item.id;
    
    return (
      <TouchableOpacity 
        style={[
          styles.chapterItem, 
          isSelected && styles.selectedChapterItem
        ]} 
        onPress={() => setSelectedChapter(item)}
      >
        <View style={styles.chapterNumberContainer}>
          <Text style={styles.chapterNumber}>{item.id}</Text>
        </View>
        <View style={styles.chapterDetailsContainer}>
          <View style={styles.chapterNameWrapper}>
            <Text style={styles.chapterName} numberOfLines={1}>{item.name}</Text>
          </View>
          <Text style={styles.arabicName}>{item.arabicName}</Text>
          <Text style={styles.versesCount}>{item.versesCount} verses</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chapters (Surahs)</Text>
      </View>
      <FlatList
        data={chapters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  list: {
    height: '100%',
  },
  listContent: {
    paddingBottom: 20,
  },
  chapterItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedChapterItem: {
    backgroundColor: colors.highlight,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  chapterNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  chapterNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  chapterDetailsContainer: {
    flex: 1,
    minWidth: 0, // This is important to allow proper text truncation
  },
  chapterNameWrapper: {
    width: '100%',
  },
  chapterName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    flexShrink: 1,
  },
  arabicName: {
    fontSize: 18,
    marginTop: 4,
    color: colors.primary,
    fontFamily: 'System',
    textAlign: 'right',
  },
  versesCount: {
    fontSize: 12,
    marginTop: 4,
    color: colors.textSecondary,
  },
});

export default ChapterList;