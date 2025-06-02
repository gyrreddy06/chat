import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { SocketProvider } from '@/context/SocketContext';
import useCachedResources from '@/hooks/useCachedResources';

export default function RootLayout() {
  useFrameworkReady();
  const { isLoadingComplete, fontsLoaded, fontError } = useCachedResources();

  if (!isLoadingComplete && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
          </Stack>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}