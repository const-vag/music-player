import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from './HomeScreen';
import SearchScreen from './search/SearchScreen';
import { HomeRoutes, SearchStackParamList } from './types';

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
    </Stack.Navigator>
  );
};
