import { API_URL } from '@env';
import { AxiosInterceptor } from '../AxiosInterceptor';
import { SongWithAlbumImage } from './songs.api';
import { Artist } from './artists.api';

const userUrl = `${API_URL}/users/me`;

export interface User {
  id: string;
  email: string;
  username: string;
}

export const getUser = async () => {
  const axios = AxiosInterceptor.Instance;

  return (await axios.get<User>(userUrl)).data;
};

const favoriteSongsUrl = `${API_URL}/users/favorite_songs`;
export const getFavoriteSongs = async () => {
  const axios = AxiosInterceptor.Instance;

  return (await axios.get<{ songs: SongWithAlbumImage[] }>(favoriteSongsUrl))
    .data.songs;
};

const followedArtistsUrl = `${API_URL}/users/followed_artists`;
export const getFollowedArtists = async () => {
  const axios = AxiosInterceptor.Instance;

  return (await axios.get<{ artists: Artist[] }>(followedArtistsUrl)).data
    .artists;
};
