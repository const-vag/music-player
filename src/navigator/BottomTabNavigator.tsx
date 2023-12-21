import React, { ComponentProps, useEffect } from 'react';
import { BottomNavigation, Snackbar } from 'react-native-paper';
import { More } from '../screens/more/MoreScreen';
import { HomeStack } from '../screens/search/HomeStack';
import { MiniPlayer } from './MiniPlayer';
import { BottomTabRoutes } from './types';
import { useSnackbarStore } from '../shared/stores/snackbar/useSnackbarStore';
import { useSnackbarControls } from '../shared/stores/snackbar/useSnackbarControls';

type BaseRoute = ComponentProps<
  typeof BottomNavigation
>['navigationState']['routes'][number];

const routes: BaseRoute[] = [
  {
    key: BottomTabRoutes.HOME,
    title: 'Home',
    focusedIcon: 'home',
    unfocusedIcon: 'home-outline',
  },
  { key: BottomTabRoutes.MORE, title: 'More', focusedIcon: 'dots-horizontal' },
];

export const BottomTabNavigator = () => {
  const [index, setIndex] = React.useState(0);

  const renderScene = BottomNavigation.SceneMap({
    [BottomTabRoutes.HOME]: HomeStack,
    [BottomTabRoutes.MORE]: More,
  });


  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />


    </>
  );
};
