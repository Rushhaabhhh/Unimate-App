import { Stack, SplashScreen} from 'expo-router/stack';
import React, { useEffect } from 'react';

// SplashScreen.preventAutoHideAsync();

export default function Layout() {
  
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(Auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
