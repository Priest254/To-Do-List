import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ConvexProvider } from "convex/react";
import { Slot } from 'expo-router';
import client from '../src/convex/client';
import { ThemeProvider } from '../src/components/ThemeProvider';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConvexProvider client={client}>
        <ThemeProvider>
          <Slot />
        </ThemeProvider>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}

