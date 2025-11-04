import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ConvexProvider } from "convex/react";
import client from './convex/client';
import { ThemeProvider } from './components/ThemeProvider';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConvexProvider client={client}>
        <ThemeProvider>
          <HomeScreen />
        </ThemeProvider>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}
