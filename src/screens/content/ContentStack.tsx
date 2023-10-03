import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { Album } from './album/AlbumScreen';
import { Artist } from './artist/ArtistScreen';
import { ContentParamList, ContentRoutes } from './types';

const Stack = createStackNavigator<ContentParamList>();

export const ContentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
          gestureEnabled: true,
        }}
        name={ContentRoutes.ARTIST}
        component={Artist}
      />
      <Stack.Screen
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
          gestureEnabled: true,
        }}
        name={ContentRoutes.ALBUM}
        component={Album}
      />
    </Stack.Navigator>
  );
};
