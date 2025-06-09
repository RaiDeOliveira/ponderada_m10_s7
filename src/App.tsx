import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation/Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </NavigationContainer>
  );
}
