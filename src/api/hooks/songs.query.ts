import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import {
  Song,
  getSongs,
  likeSong,
  unlikeSong,
  getNextSong,
  SongWithAlbumImage,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from '../requests/songs.api';
import { ErrorResponse } from '../shared-types';

const SONGS_QUERY_KEY = 'songs';
export const useSongsQuery = () => {
  return useQuery<Song[]>([SONGS_QUERY_KEY], getSongs, {
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(
          '🚀 ~ file: songs.query.ts:10 ~ useSongsQuery ~ error:',
          error.response?.data
        );
      }
    },
  });
};

export const useNextSongQuery = (currentSongId: number | undefined) => {
  return useQuery<SongWithAlbumImage | undefined>(
    [SONGS_QUERY_KEY, currentSongId],
    () => {
      if (!currentSongId) return Promise.resolve(undefined);
      return getNextSong(currentSongId);
    },
    {
      onError: (error) => {
        if (isAxiosError<ErrorResponse>(error)) {
          console.log(
            '🚀 ~ file: songs.query.ts:10 ~ useSongsQuery ~ error:',
            error.response?.data
          );
        }
      },
      cacheTime: 0,
      staleTime: 0,
    }
  );
};

export const useLikeSongMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeSong,
    onSuccess: async () => {
      console.log('Like song mutation success');
      queryClient.refetchQueries({ stale: true });
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error))
        console.log('Like song mutation failed: ', error.response?.data);
    },
  });
};

export const useUnlikeSongMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikeSong,
    onSuccess: async () => {
      console.log('Unlike song mutation success');
      queryClient.refetchQueries({ stale: true });
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error))
        console.log('Unlike song mutation failed: ', error.response?.data);
    },
  });
};

export const useAddSongToPlaylistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSongToPlaylist,
    onSuccess: async () => {
      console.log('add song to playlist mutation success');
      queryClient.refetchQueries({ stale: true });
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error))
        console.log(
          'add song to playlist mutation failed: ',
          error.response?.data
        );
    },
  });
};

export const useRemoveSongFromPlaylistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeSongFromPlaylist,
    onSuccess: async () => {
      console.log('add song to playlist mutation success');
      queryClient.refetchQueries({ stale: true });
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error))
        console.log(
          'remove song from playlist mutation failed: ',
          error.response?.data
        );
    },
  });
};
