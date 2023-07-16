import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  PaperProvider,
  MD3DarkTheme,
  MD3Theme,
} from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigator/AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  const { theme } = useMaterial3Theme();

  const paperTheme: MD3Theme = { ...MD3DarkTheme, colors: theme.dark }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
