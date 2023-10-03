import { RouteProp, useRoute } from '@react-navigation/native';
import { ContentParamList, ContentRoutes } from '../types';
import { useAlbumQuery } from '../../../api/hooks/albums.query';

type AlbumRouteProp = RouteProp<ContentParamList, ContentRoutes.ALBUM>;

export const useAlbumScreen = () => {
  const { params } = useRoute<AlbumRouteProp>();

  const albumQuery = useAlbumQuery(params.id);

  return albumQuery;
};
