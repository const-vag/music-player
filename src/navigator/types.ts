export enum AppNavigatorRoutes {
  AUTHENTICATION = 'Authentication',
  MAIN = 'Main',
}

export enum BottomTabRoutes {
  HOME = 'Home',
  SEARCH = 'Search',
  MORE = 'More',
  PLAYER = 'Player',
}

export type BottomTabParamList = {
  [BottomTabRoutes.HOME]: undefined;
  [BottomTabRoutes.PLAYER]: undefined;
};

export type AppNavigatorRouteParamList = {
  [AppNavigatorRoutes.AUTHENTICATION]: undefined;
  [AppNavigatorRoutes.MAIN]: undefined;
};
