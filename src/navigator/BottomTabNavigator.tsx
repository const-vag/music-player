import React, { ComponentProps } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { Home } from '../screens/home/Home';
import { More } from '../screens/more/More';
import { SearchStack } from '../screens/search/SearchStack';
import { MiniPlayer } from './MiniPlayer';
import { BottomTabRoutes } from './types';

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
  { key: BottomTabRoutes.SEARCH, title: 'Search', focusedIcon: 'magnify' },
  { key: BottomTabRoutes.MORE, title: 'More', focusedIcon: 'dots-horizontal' },
];

export const BottomTabNavigator = () => {
  const [index, setIndex] = React.useState(0);

  const renderScene = BottomNavigation.SceneMap({
    [BottomTabRoutes.HOME]: Home,
    [BottomTabRoutes.SEARCH]: SearchStack,
    [BottomTabRoutes.MORE]: More,
  });

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
      <MiniPlayer />
    </>
  );
};
