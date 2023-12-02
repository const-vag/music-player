export enum AppNavigatorRoutes {
  AUTHENTICATION = 'Authentication Section',
  MAIN = 'Main Section',
}

export type AppNavigatorRouteParamList = {
  [AppNavigatorRoutes.AUTHENTICATION]: undefined;
  [AppNavigatorRoutes.MAIN]: undefined;
};

export enum BottomTabRoutes {
  HOME = 'Home Tab',
  MORE = 'More Tab',
  PLAYER = 'Player',
}

export type BottomTabParamList = {
  [BottomTabRoutes.HOME]: undefined;
  [BottomTabRoutes.MORE]: undefined;
};

export enum MainStackRoutes {
  HOME = 'Main',
  PLAYER = 'Player',
}

export type MainStackParamList = {
  [MainStackRoutes.HOME]: undefined;
  [MainStackRoutes.PLAYER]: undefined;
};
