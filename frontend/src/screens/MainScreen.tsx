// src/screens/MainScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChapterList from '../components/ChapterList';
import QuranReaderScreen from './QuranReaderScreen';
import { QuranProvider } from '../context/QuranContext';
import { colors } from '../theme/colors';

const MainScreen = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  // Increased width percentage to accommodate longer chapter names
  const sidebarWidth = sidebarVisible ? '45%' : 0;

  return (
    <QuranProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.sidePanel, { width: sidebarWidth }]}>
          {sidebarVisible && <ChapterList />}
        </View>
        <View style={styles.mainContent}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => setSidebarVisible(!sidebarVisible)}
            >
              <Icon name={sidebarVisible ? "menu-open" : "menu"} size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Quran Reader</Text>
          </View>
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
    backgroundColor: colors.background,
  },
  sidePanel: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
    backgroundColor: colors.surface,
  },
  mainContent: {
    flex: 1,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default MainScreen;