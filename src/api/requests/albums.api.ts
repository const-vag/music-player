import { API_URL } from '@env';
import { AxiosInterceptor } from '../AxiosInterceptor';
import { ArtistSimple } from './artists.api';
import { Song } from './songs.api';

const albumsUrl = `${API_URL}/albums`;

export enum Type {
  Album = 'ALBUM',
  Single = 'SINGLE',
}

export interface Album {
  createdAt: Date;
  id: string;
  image: string;
  name: string;
  releaseDate: Date;
  type: Type;
  updatedAt: Date;
  artist: ArtistSimple;
  songs: Song[];
}

export const getAlbumRequest = async (id: string) => {
  const axios = AxiosInterceptor.Instance;

  return (await axios.get<Album>(`${albumsUrl}/${id}`)).data;
};
