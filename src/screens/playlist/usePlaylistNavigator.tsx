import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList, MainStackRoutes } from '../../navigator/types';

export const usePlaylistNavigators = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  const goToPlaylist = (id: number) => {
    navigation.navigate(MainStackRoutes.PLAYLIST, {
      id,
    });
  };

  //   const goToPlaylist = (id: number) => {
  //     navigation.navigate(MainStackRoutes.PLAYLIST, {
  //       screen: MainStackRoutes.PLAYLIST,
  //       params: {
  //         id,
  //       },
  //     });
  //   };

  return {
    goToPlaylist,
  };
};
