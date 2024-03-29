import React from 'react';
import { MoreRoutes, MoreStackParamList } from './types';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { MoreScreen } from './MoreScreen';
import { FollowedArtistsScreen } from './followed-artists/FollowedArtistsScreen';
import { FavoriteSongsScreen } from './FavoriteSongsScreen';

const Stack = createStackNavigator<MoreStackParamList>();

export const MoreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name={MoreRoutes.MORE} component={MoreScreen} />
      <Stack.Screen
        name={MoreRoutes.FOLLOWED_ARTISTS_SCREEN}
        component={FollowedArtistsScreen}
      />
      <Stack.Screen
        name={MoreRoutes.FAVORITE_SONGS}
        component={FavoriteSongsScreen}
      />
    </Stack.Navigator>
  );
};
