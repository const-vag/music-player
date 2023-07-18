import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { ContentStack } from '../content/ContentStack';
import { SearchMain } from './SearchMain';
import { SearchRoutes, SearchStackParamList } from './types';

const Stack = createStackNavigator<SearchStackParamList>();

export const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
        name={SearchRoutes.MAIN}
        component={SearchMain}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
          gestureEnabled: true,
        }}
        name={SearchRoutes.CONTENT}
        component={ContentStack}
      />
    </Stack.Navigator>
  );
};
