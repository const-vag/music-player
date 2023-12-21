import React, { useEffect } from 'react';
import { MainStackParamList, MainStackRoutes } from './types';
import { Player } from '../screens/player/PlayerScreen';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { ContentStack } from '../screens/content/ContentStack';
import { MiniPlayer } from './MiniPlayer';
import { Snackbar } from 'react-native-paper';
import { useSnackbarStore } from '../shared/stores/snackbar/useSnackbarStore';
import { useSnackbarControls } from '../shared/stores/snackbar/useSnackbarControls';

const Stack = createStackNavigator<MainStackParamList>();
export const MainNavigatorStack = () => {
  const { isVisible, message } = useSnackbarStore();
  const { hide } = useSnackbarControls();

  useEffect(() => {
    const timer = setTimeout(() => {
      hide();
    }, 2000);
    return () => clearTimeout(timer);
  }, [hide, isVisible]);

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name={MainStackRoutes.HOME}
          component={BottomTabNavigator}
        />
        <Stack.Screen
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            headerShown: false,
            gestureEnabled: true,
          }}
          name={MainStackRoutes.PLAYER}
          component={Player}
        />
        <Stack.Screen
          options={{
            ...TransitionPresets.SlideFromRightIOS,
            headerShown: false,
            gestureEnabled: true,
          }}
          name={MainStackRoutes.CONTENT}
          component={ContentStack}
        />
      </Stack.Navigator>
      <Snackbar
        visible={isVisible}
        onDismiss={hide}
        action={{
          label: 'OK',
        }}
      >
        {message}
      </Snackbar>
      <MiniPlayer />
    </>
  );
};
