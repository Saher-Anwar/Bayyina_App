import React from 'react';
import { StatusBar } from 'react-native';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <MainScreen />
    </>
  );
};

export default App;
