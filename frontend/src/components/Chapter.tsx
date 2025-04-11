import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Verse } from './Verse';
import Svg, { Path, G } from 'react-native-svg';

type ChapterProps = {
  name: string;
  verses: string[][];
  chapterNumber: number;
  onWordPress: (info: { word: string; chapterNumber: number; verseNumber: number; wordIndex: number }) => void;
  selectedWordInfo: { chapterNumber: number; verseNumber: number; wordIndex: number } | null;
};

export const Chapter: React.FC<ChapterProps> = ({ 
  name, 
  verses, 
  chapterNumber, 
  onWordPress, 
  selectedWordInfo 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.chapterHeader}>
        {/* Decorative element above title */}
        <DecorativeOrnament />
        
        {/* Chapter number badge */}
        <View style={styles.chapterNumberContainer}>
          <Text style={styles.chapterNumberText}>{chapterNumber}</Text>
        </View>
        
        {/* Chapter name */}
        <Text style={styles.chapterName}>{name}</Text>
        
        {/* Decorative line below title */}
        <View style={styles.decorativeLine}>
          <View style={styles.line} />
          <View style={styles.diamond} />
          <View style={styles.line} />
        </View>
      </View>
      
      {/* Display verses */}
      <Verse
        verses={verses}
        onWordPress={onWordPress}
        chapterNumber={chapterNumber}
        selectedWordInfo={selectedWordInfo}
      />
    </View>
  );
};

// Decorative SVG ornament component for the top of the title
const DecorativeOrnament = () => (
  <View style={styles.ornamentContainer}>
    <Svg height="50" width="200" viewBox="0 0 200 50">
      <G fill="#FFD700">
        <Path d="M100,10 Q120,0 140,10 T180,10 L180,5 Q160,0 140,5 T100,5 T60,5 T20,5 L20,10 Q40,0 60,10 T100,10 Z" />
        <Path d="M100,25 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0" />
      </G>
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  chapterHeader: {
    marginVertical: 20,
    alignItems: 'center',
  },
  ornamentContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  chapterNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  chapterNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1C',
  },
  chapterName: {
    fontSize: 32,
    fontFamily: 'ScheherazadeNew_700Bold',
    color: '#FFD700',
    textAlign: 'center',
    marginVertical: 8,
    paddingHorizontal: 30,
  },
  decorativeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#FFD700',
  },
  diamond: {
    width: 10,
    height: 10,
    backgroundColor: '#FFD700',
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 10,
  },
});