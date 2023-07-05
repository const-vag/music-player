import { ContentParamList, ContentRoutes } from "../content/types";

export enum SearchRoutes {
  SEARCH_BAR = "Search bar",
  CONTENT = "Content",
}

export type SearchStackParamList = {
  [SearchRoutes.SEARCH_BAR]: undefined;
  [SearchRoutes.CONTENT]: {
    screen: ContentRoutes
    params: ContentParamList[ContentRoutes]
  };
};
