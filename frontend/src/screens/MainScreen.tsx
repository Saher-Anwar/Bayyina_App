// src/screens/MainScreen.tsx
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import ChapterList from '../components/ChapterList';
import QuranReaderScreen from './QuranReader';
import { QuranProvider } from '../context/QuranContext';

const MainScreen = () => {
  return (
    <QuranProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.sidePanel}>
          <ChapterList />
        </View>
        <View style={styles.mainContent}>
          <QuranReaderScreen />
        </View>
      </SafeAreaView>
    </QuranProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidePanel: {
    width: '30%',
    borderRightWidth: 1,
    borderRightColor: '#dee2e6',
  },
  mainContent: {
    flex: 1,
  },
});

export default MainScreen;