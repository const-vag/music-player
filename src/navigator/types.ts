export enum AppNavigatorRoutes {
  AUTHENTICATION = 'Authentication',
  MAIN = 'Main',
}

export enum BottomTabRoutes {
  HOME = 'Home',
  MORE = 'More',
  PLAYER = 'Player',
}

export type BottomTabParamList = {
  [BottomTabRoutes.HOME]: undefined;
  [BottomTabRoutes.MORE]: undefined;
  [BottomTabRoutes.PLAYER]: undefined;
};

export type AppNavigatorRouteParamList = {
  [AppNavigatorRoutes.AUTHENTICATION]: undefined;
  [AppNavigatorRoutes.MAIN]: undefined;
};
