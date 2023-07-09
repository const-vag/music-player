import { API_URL } from '@env';
import { AxiosInterceptor } from '../AxiosInteceptor';
import { Album } from './albums.api';

const artistsUrl = `${API_URL}/artists`;

export interface Artist {
  albums: Album[];
  createdAt: Date;
  id: string;
  image: string;
  language: string;
  name: string;
  updatedAt: Date;
  genres: any[];
}

export const getArtistRequest = async (id: string) => {
  const axios = AxiosInterceptor.Instance;

  return (await axios.get<Artist>(`${artistsUrl}/${id}`)).data;
};

export const getArtistsRequest = async () => {
  const axios = AxiosInterceptor.Instance;

  return (await axios.get(artistsUrl)).data;
};
