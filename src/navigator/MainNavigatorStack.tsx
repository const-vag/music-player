import React from 'react';
import { MainStackParamList, MainStackRoutes } from './types';
import { Player } from '../screens/player/PlayerScreen';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import { ContentStack } from '../screens/content/ContentStack';

const Stack = createStackNavigator<MainStackParamList>();
export const MainNavigatorStack = () => {
  return (
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
  );
};
