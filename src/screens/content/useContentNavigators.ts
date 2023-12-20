import { useNavigation } from '@react-navigation/native';
import { ContentRoutes } from './types';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList, MainStackRoutes } from '../../navigator/types';

export const useContentNavigators = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  const goToAlbum = (id: number) => {
    navigation.navigate(MainStackRoutes.CONTENT, {
      screen: ContentRoutes.ALBUM,
      params: {
        id,
      },
    });
  };

  const goToArtist = (id: number) => {
    navigation.navigate(MainStackRoutes.CONTENT, {
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
