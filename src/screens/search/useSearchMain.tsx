import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ContentRoutes } from '../content/types';
import { SearchRoutes, SearchStackParamList } from './types';

export const useSearchMain = () => {
  const navigation = useNavigation<StackNavigationProp<SearchStackParamList>>();

  const goToHawkTsibouki = () => {
    /* 
      Nesting navigation guide:
      https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator
    */
    navigation.navigate(SearchRoutes.CONTENT, {
      screen: ContentRoutes.ARTIST,
      params: {
        id: 2,
      },
    });
  };

  return {
    goToHawkTsibouki,
  };
};
