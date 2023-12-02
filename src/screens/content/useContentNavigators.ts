import { useNavigation } from '@react-navigation/native';
import { HomeRoutes, SearchStackParamList } from '../search/types';
import { ContentRoutes } from './types';
import { StackNavigationProp } from '@react-navigation/stack';

export const useContentNavigators = () => {
  const navigation = useNavigation<StackNavigationProp<SearchStackParamList>>();

  const goToAlbum = (id: number) => {
    navigation.navigate(HomeRoutes.CONTENT, {
      screen: ContentRoutes.ALBUM,
      params: {
        id,
      },
    });
  };

  const goToArtist = (id: number) => {
    navigation.navigate(HomeRoutes.CONTENT, {
      screen: ContentRoutes.ARTIST,
      params: {
        id,
      },
    });
  };

  return {
    goToAlbum,
    goToArtist,
  };
};
