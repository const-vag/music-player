import { API_URL } from '@env';
import { AxiosInterceptor } from '../AxiosInterceptor';
import { Album } from './albums.api';

const artistsUrl = `${API_URL}/artists`;

export interface Artist {
  albums: Album[];
  createdAt: Date;
  id: number;
  image: string;
  language: string;
  name: string;
  updatedAt: Date;
  genres: any[];
  followed: boolean;
}

export interface ArtistSimple {
  id: number;
  name: string;
}

export const getArtistRequest = async (id: number) => {
  const axios = AxiosInterceptor.Instance;

  return (await axios.get<Artist>(`${artistsUrl}/${id}`)).data;
};

export const getArtistsRequest = async () => {
  const axios = AxiosInterceptor.Instance;

  return (await axios.get(artistsUrl)).data;
};

export const followArtist = async (id: number) => {
  const axios = AxiosInterceptor.Instance;

  return await axios.post(`${artistsUrl}/${id}/follow`);
};

export const unfollowArtist = async (id: number) => {
  const axios = AxiosInterceptor.Instance;

  return await axios.post(`${artistsUrl}/${id}/unfollow`);
};
