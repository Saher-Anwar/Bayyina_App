import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
        <View style={styles.chapterNameContainer}>
          <Text style={styles.chapterName}>{item.name}</Text>
          <Text style={styles.arabicName}>{item.arabicName}</Text>
          <View style={styles.versesCountContainer}>
            <Text style={styles.versesCount}>{item.versesCount} verses</Text>
          </View>
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
    alignItems: 'center',
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
  },
  chapterNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  chapterNameContainer: {
    flex: 1,
  },
  chapterName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  arabicName: {
    fontSize: 18,
    marginTop: 4,
    color: colors.primary,
    fontFamily: 'System',
    textAlign: 'right',
  },
  versesCountContainer: {
    marginTop: 4,
  },
  versesCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default ChapterList;
