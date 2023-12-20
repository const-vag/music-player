import { useQuery } from '@tanstack/react-query';
import { ContentRequiredInfo } from '../../api/requests/search.api';
import { SongWithAlbumImage } from '../../api/requests/songs.api';
import { asyncStorage } from '../utils/asyncStorage';
import { useUserQuery } from '../../api/hooks/user.query';
import * as lodash from 'lodash';

const RECENTLY_SELECTED_SONGS_KEY = 'RECENTLY_SELECTED_SONGS';
const RECENTLY_SELECTED_ALBUMS_KEY = 'RECENTLY_SELECTED_ALBUMS';
const RECENTLY_SELECTED_ARTISTS_KEY = 'RECENTLY_SELECTED_ARTISTS';

const MAXIMUM_CACHE_ITEMS_LENGTH = 4;

export const useRecentlySearched = () => {
  const { get, set } = asyncStorage();
  const { data: user } = useUserQuery();

  // Local storage recently selected songs
  const { data: songs, refetch: refreshSongs } = useQuery(
    [RECENTLY_SELECTED_SONGS_KEY, user?.id || ''],
    async () =>
      (await get<SongWithAlbumImage[]>(RECENTLY_SELECTED_SONGS_KEY)) || [],
    { enabled: Boolean(user?.id) }
  );

  // Local storage recently selected albums
  const { data: albums, refetch: refreshAlbums } = useQuery(
    [RECENTLY_SELECTED_ALBUMS_KEY, user?.id || ''],
    async () =>
      (await get<ContentRequiredInfo[]>(RECENTLY_SELECTED_ALBUMS_KEY)) || [],
    { enabled: Boolean(user?.id) }
  );

  // Local storage recently selected artists
  const { data: artists, refetch: refreshArtists } = useQuery(
    [RECENTLY_SELECTED_ARTISTS_KEY, user?.id || ''],
    async () =>
      (await get<ContentRequiredInfo[]>(RECENTLY_SELECTED_ARTISTS_KEY)) || [],
    { enabled: Boolean(user?.id) }
  );

  const write = {
    song: async (song: SongWithAlbumImage) => {
      const recentlySelectedSongs =
        (await get<SongWithAlbumImage[]>(RECENTLY_SELECTED_SONGS_KEY)) || [];

      const updatedUniqueData = lodash.uniqBy(
        [song, ...recentlySelectedSongs],
        (item) => item.id
      );

      await set(
        RECENTLY_SELECTED_SONGS_KEY,
        updatedUniqueData.slice(0, MAXIMUM_CACHE_ITEMS_LENGTH)
      );
      await refreshSongs();
    },
    album: async (album: ContentRequiredInfo) => {
      const recentlySelectedAlbums =
        (await get<ContentRequiredInfo[]>(RECENTLY_SELECTED_ALBUMS_KEY)) || [];

      const updatedUniqueData = lodash.uniqBy(
        [album, ...recentlySelectedAlbums],
        (item) => item.id
      );

      await set(
        RECENTLY_SELECTED_ALBUMS_KEY,
        updatedUniqueData.slice(0, MAXIMUM_CACHE_ITEMS_LENGTH)
      );
      await refreshAlbums();
    },
    artist: async (artist: ContentRequiredInfo) => {
      const recentlySelectedArtists =
        (await get<ContentRequiredInfo[]>(RECENTLY_SELECTED_ARTISTS_KEY)) || [];

      const updatedUniqueData = lodash.uniqBy(
        [artist, ...recentlySelectedArtists],
        (item) => item.id
      );

      await set(
        RECENTLY_SELECTED_ARTISTS_KEY,
        updatedUniqueData.slice(0, MAXIMUM_CACHE_ITEMS_LENGTH)
      );

      await refreshArtists();
    },
  };

  return { songs, albums, artists, write };
};
