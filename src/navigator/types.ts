import { ContentParamList, ContentRoutes } from '../screens/content/types';

export enum AppNavigatorRoutes {
  AUTHENTICATION = 'Authentication Section',
  MAIN = 'Main Section',
}

export type AppNavigatorRouteParamList = {
  [AppNavigatorRoutes.AUTHENTICATION]: undefined;
  [AppNavigatorRoutes.MAIN]: undefined;
};

export enum BottomTabRoutes {
  HOME_TAB = 'Home Tab',
  MORE_TAB = 'More Tab',
}

export type BottomTabParamList = {
  [BottomTabRoutes.HOME_TAB]: undefined;
  [BottomTabRoutes.MORE_TAB]: undefined;
};

export enum MainStackRoutes {
  HOME = 'Main',
  PLAYER = 'Player',
  CONTENT = 'Content',
}

export type MainStackParamList = {
  [MainStackRoutes.HOME]: undefined;
  [MainStackRoutes.PLAYER]: undefined;
  [MainStackRoutes.CONTENT]: {
    screen: ContentRoutes;
    params: ContentParamList[ContentRoutes];
  };
};
