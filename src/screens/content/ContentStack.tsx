import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { Album } from './album/AlbumScreen';
import { Artist } from './artist/ArtistScreen';
import { ContentParamList, ContentRoutes } from './types';
import { useMiniPlayerControls } from '../../shared/stores/player/MiniPlayerStore';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createStackNavigator<ContentParamList>();

export const ContentStack = () => {
  const { minimize, maximize } = useMiniPlayerControls();

  useFocusEffect(
    useCallback(() => {
      minimize();
      return () => maximize();
    }, [maximize, minimize])
  );

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
