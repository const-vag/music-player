import { RouteProp, useRoute } from '@react-navigation/native';
import { ContentParamList, ContentRoutes } from '../types';
import { useArtistQuery } from '../../../api/hooks/artists.query';
import { Album, Type } from '../../../api/requests/albums.api';

type ArtistRouteProp = RouteProp<ContentParamList, ContentRoutes.ARTIST>;

export const useArtist = () => {
  const { params } = useRoute<ArtistRouteProp>();

  const artistQuery = useArtistQuery(params.id);

  const separateAlbumsAndSingles = (albums: Album[]) => {
    const separatedData = albums.reduce(
      (acc: { singles: Album[]; albums: Album[] }, album) => {
        if (album.type === Type.Album) {
          return { ...acc, albums: [...acc.albums, album] };
        }
        return { ...acc, singles: [...acc.singles, album] };
      },
      { singles: [], albums: [] }
    );
    return [
      { title: 'Albums', data: separatedData.albums },
      { title: 'Singles', data: separatedData.singles },
    ];
  };

  return { artistQuery, separateAlbumsAndSingles };
};
