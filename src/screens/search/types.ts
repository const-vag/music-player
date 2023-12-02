import { ContentParamList, ContentRoutes } from '../content/types';

export enum HomeRoutes {
  HOME = 'Home',
  SEARCH = 'Search',
  CONTENT = 'Content',
}

export type SearchStackParamList = {
  [HomeRoutes.HOME]: undefined;
  [HomeRoutes.SEARCH]: undefined;
  [HomeRoutes.CONTENT]: {
    screen: ContentRoutes;
    params: ContentParamList[ContentRoutes];
  };
};
