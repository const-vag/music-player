import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { ContentStack } from '../content/ContentStack';
import { HomeScreen } from './HomeScreen';
import { HomeRoutes, SearchStackParamList } from './types';
import SearchScreen from './SearchScreen';

const Stack = createStackNavigator<SearchStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
        name={HomeRoutes.HOME}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
        name={HomeRoutes.SEARCH}
        component={SearchScreen}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
          gestureEnabled: true,
        }}
        name={HomeRoutes.CONTENT}
        component={ContentStack}
      />
    </Stack.Navigator>
  );
};
