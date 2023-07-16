import { API_URL } from '@env';
import { AxiosInterceptor } from '../AxiosInterceptor';
import { ArtistSimple } from './artists.api';

const songsUrl = `${API_URL}/songs`;

export interface Song {
  id: number;
  name: string;
  length: number;
  link: string;
  trackNumber: number;
  artists: ArtistSimple[];
}

export const getSongs = async () => {
  const axios = AxiosInterceptor.Instance;

  return (await axios.get<Song[]>(songsUrl)).data;
};

export const likeSong = async (id: number) => {
  const axios = AxiosInterceptor.Instance;

  return await axios.post(`${songsUrl}/${id}/like`);
};

export const unlikeSong = async (id: number) => {
  const axios = AxiosInterceptor.Instance;

  return await axios.post(`${songsUrl}/${id}/unlike`);
};