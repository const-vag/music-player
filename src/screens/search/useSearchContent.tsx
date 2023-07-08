import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ContentParamList, ContentRoutes } from "../content/types";
import { SearchRoutes, SearchStackParamList } from "./types";

type SearchStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SearchStackParamList>,
  StackNavigationProp<ContentParamList>
>;

export const useSearchContent = () => {
  const navigation = useNavigation<StackNavigationProp<SearchStackParamList>>();

  const goToHawkTsibouki = () => {
    /* 
      Nesting navigation guide:
      https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator
    */
    navigation.navigate(SearchRoutes.CONTENT, {
      screen: ContentRoutes.ARTIST,
      params: {
        id: "2",
      },
    });
  };

  return {
    goToHawkTsibouki,
  };
};
