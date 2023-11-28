import { API_URL } from '@env';
import { AxiosInterceptor } from '../AxiosInterceptor';
import { SongWithAlbumImage } from './songs.api';

export interface ContentRequiredInfo {
  id: number;
  name: string;
  image: string;
}

export interface SearchResult {
  songs: SongWithAlbumImage[];
  albums: ContentRequiredInfo[];
  artists: ContentRequiredInfo[];
}

const searchUrl = `${API_URL}/search`;

export const getSearchRequest = async (keyword: string) => {
  const axios = AxiosInterceptor.Instance;

  return (
    // equals to `${searchUrl}?keyword=${keyword}`
    (
      await axios.get<SearchResult>(`${searchUrl}`, {
        params: {
          keyword,
        },
      })
    ).data
  );
};
