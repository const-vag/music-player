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

export enum MainStackRoutes {
  HOME = 'Home',
  PLAYER = 'Player',
}

export type MainStackParamList = {
  [MainStackRoutes.HOME]: undefined;
  [MainStackRoutes.PLAYER]: undefined;
};

export type AppNavigatorRouteParamList = {
  [AppNavigatorRoutes.AUTHENTICATION]: undefined;
  [AppNavigatorRoutes.MAIN]: undefined;
};
