import { ContentParamList, ContentRoutes } from '../content/types';

export enum SearchRoutes {
  MAIN = 'Search main',
  SEARCH_SCREEN = 'Search screen',
  CONTENT = 'Content',
}

export type SearchStackParamList = {
  [SearchRoutes.MAIN]: undefined;
  [SearchRoutes.CONTENT]: {
    screen: ContentRoutes;
    params: ContentParamList[ContentRoutes];
  };
};
