import React, { ComponentProps, useEffect } from 'react';
import { BottomNavigation, Snackbar } from 'react-native-paper';
import { Home } from '../screens/home/HomeScreen';
import { More } from '../screens/more/MoreScreen';
import { SearchStack } from '../screens/search/SearchStack';
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
  const { isVisible, message } = useSnackbarStore();
  const { hide } = useSnackbarControls();
  const [index, setIndex] = React.useState(0);

  const renderScene = BottomNavigation.SceneMap({
    [BottomTabRoutes.HOME]: SearchStack,
    [BottomTabRoutes.MORE]: More,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      hide();
    }, 2000);
    return () => clearTimeout(timer);
  }, [hide, isVisible]);

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
      <MiniPlayer />
      <Snackbar
        visible={isVisible}
        onDismiss={hide}
        action={{
          label: 'OK',
        }}
      >
        {message}
      </Snackbar>
    </>
  );
};
