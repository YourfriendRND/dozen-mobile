import React from 'react';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppNavigator } from './src/navigation/app-navigator';
import { colors } from './src/theme/design-system'
import { useAuthStore } from './src/store/auth.store';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    surface: colors.surface,
    background: colors.background,
    outline: colors.outline,
  },
}

export default function App() {
  AsyncStorage.clear()
  useAuthStore.subscribe((state) => {
    console.log('STATE HAS BEEN CHANGED');

    console.log(state)
  })

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
