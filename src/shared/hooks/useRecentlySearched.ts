import { useQuery } from '@tanstack/react-query';
import { useUserQuery } from '../../api/hooks/user.query';
import { ContentRequiredInfo } from '../../api/requests/search.api';
import { SongWithAlbumImage } from '../../api/requests/songs.api';
import { asyncStorage } from '../utils/asyncStorage';

const RECENTLY_SELECTED_SONGS_KEY = 'RECENTLY_SELECTED_SONGS';
const RECENTLY_SELECTED_ALBUMS_KEY = 'RECENTLY_SELECTED_ALBUMS';
const RECENTLY_SELECTED_ARTISTS_KEY = 'RECENTLY_SELECTED_ARTISTS';

export const useRecentlySearched = () => {
  const { get, set } = asyncStorage();
  const { data: user } = useUserQuery();
  const { data: songs, refetch: refreshSongs } = useQuery(
    [RECENTLY_SELECTED_ALBUMS_KEY, user?.id || ''],
    async () =>
      (await get<SongWithAlbumImage[]>(RECENTLY_SELECTED_SONGS_KEY)) || []
  );
  const { data: albums, refetch: refreshAlbums } = useQuery(
    [RECENTLY_SELECTED_ALBUMS_KEY, user?.id || ''],
    async () =>
      (await get<ContentRequiredInfo[]>(RECENTLY_SELECTED_ALBUMS_KEY)) || []
  );
  const { data: artists, refetch: refreshArtists } = useQuery(
    [RECENTLY_SELECTED_ARTISTS_KEY, user?.id || ''],
    async () =>
      (await get<ContentRequiredInfo[]>(RECENTLY_SELECTED_ARTISTS_KEY)) || []
  );

  const write = {
    song: async (song: SongWithAlbumImage) => {
      const recentlySelectedSongs = await get<SongWithAlbumImage[]>(
        RECENTLY_SELECTED_SONGS_KEY
      );
      await set(RECENTLY_SELECTED_SONGS_KEY, [
        song,
        ...(recentlySelectedSongs ? recentlySelectedSongs.slice(0, 3) : []),
      ]);
      await refreshSongs();
    },
    album: async (album: ContentRequiredInfo) => {
      const recentlySelectedAlbums = await get<ContentRequiredInfo[]>(
        RECENTLY_SELECTED_ALBUMS_KEY
      );
      await set(RECENTLY_SELECTED_ALBUMS_KEY, [
        album,
        ...(recentlySelectedAlbums ? recentlySelectedAlbums.slice(0, 3) : []),
      ]);
      await refreshAlbums();
    },
    artist: async (artist: ContentRequiredInfo) => {
      const recentlySelectedAlbums = await get<ContentRequiredInfo[]>(
        RECENTLY_SELECTED_ARTISTS_KEY
      );
      await set(RECENTLY_SELECTED_ARTISTS_KEY, [
        artist,
        ...(recentlySelectedAlbums ? recentlySelectedAlbums.slice(0, 3) : []),
      ]);
      await refreshArtists();
    },
  };

  return { songs, albums, artists, write };
};
