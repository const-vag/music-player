import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContentRoutes } from '../content/types';
import { HomeRoutes, SearchStackParamList } from './types';

export const useHomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<SearchStackParamList>>();

  const goToSearchPage = () => {
    navigation.navigate(HomeRoutes.SEARCH);
  };

  const goToHawkTsibouki = () => {
    /* 
      Nesting navigation guide:
      https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator
    */
    navigation.navigate(HomeRoutes.CONTENT, {
      screen: ContentRoutes.ARTIST,
      params: {
        id: 2,
      },
    });
  };

  return {
    goToHawkTsibouki,
    goToSearchPage,
  };
};
