import { API_URL } from '@env';
import { AxiosInterceptor } from '../AxiosInterceptor';
import { ArtistSimple } from './artists.api';

const songsUrl = `${API_URL}/songs` as const;

export interface Song {
  id: number;
  name: string;
  length: number;
  link: string;
  trackNumber: number;
  artists: ArtistSimple[];
  liked: boolean;
}

export type SongWithAlbumImage = Song & { albumImage: string };

export const isSongWithAlbumImage = (
  input: any
): input is SongWithAlbumImage => {
  return Boolean(input.trackNumber) && Boolean(input.albumImage);
};

export const getSongs = async () => {
  const axios = AxiosInterceptor.Instance;

  return (await axios.get<Song[]>(songsUrl)).data;
};

export const getNextSong = async (currentSongId: number) => {
  const axios = AxiosInterceptor.Instance;

  return (
    await axios.get<SongWithAlbumImage>(`${songsUrl}/${currentSongId}/next`)
  ).data;
};

export const likeSong = async (id: number) => {
  const axios = AxiosInterceptor.Instance;

  return await axios.post(`${songsUrl}/${id}/like`);
};

export const unlikeSong = async (id: number) => {
  const axios = AxiosInterceptor.Instance;

  return await axios.post(`${songsUrl}/${id}/unlike`);
};

export const addSongToPlaylist = async (properties: {
  songId: number;
  playlistId: number;
}) => {
  const axios = AxiosInterceptor.Instance;

  return await axios.post(
    `${songsUrl}/${properties.songId}/add_to_playlist/${properties.playlistId}`
  );
};

export const removeSongFromPlaylist = async (properties: {
  songId: number;
  playlistId: number;
}) => {
  const axios = AxiosInterceptor.Instance;

  return await axios.post(
    `${songsUrl}/${properties.songId}/remove_from_playlist/${properties.playlistId}`
  );
};
