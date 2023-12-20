export enum HomeRoutes {
  HOME = 'Home',
  SEARCH = 'Search',
}

export type SearchStackParamList = {
  [HomeRoutes.HOME]: undefined;
  [HomeRoutes.SEARCH]: undefined;
};
