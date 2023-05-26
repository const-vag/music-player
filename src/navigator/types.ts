export enum Routes {
  SIGNIN = "Sign in",
  MAIN = "Main",
}

export enum BottomTabRoutes {
  HOME = "Home",
  SEARCH = "Search",
  MORE = "More",
  PLAYER = "Player",
}

export type BottomTabParamList = {
  [BottomTabRoutes.HOME]: undefined;
  [BottomTabRoutes.PLAYER]: undefined;
};

export type RouteParamList = {
  [Routes.SIGNIN]: undefined;
  [Routes.MAIN]: undefined;
};
