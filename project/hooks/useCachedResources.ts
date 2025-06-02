import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Nunito-Regular': Nunito_400Regular,
    'Nunito-Medium': Nunito_500Medium,
    'Nunito-SemiBold': Nunito_600SemiBold,
    'Nunito-Bold': Nunito_700Bold,
  });

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load additional resources here

        // Load fonts and other assets in parallel
        await Promise.all([
          // You can add more resources to load here
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        if (fontsLoaded || fontError) {
          // Hide splash screen once fonts are loaded or there's an error
          SplashScreen.hideAsync();
        }
      }
    }

    loadResourcesAndDataAsync();
  }, [fontsLoaded, fontError]);

  return {
    isLoadingComplete,
    fontsLoaded,
    fontError,
  };
}