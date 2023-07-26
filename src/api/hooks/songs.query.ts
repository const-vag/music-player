import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Song, getSongs, likeSong, unlikeSong } from '../requests/songs.api';
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

export const useLikeSongMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeSong,
    onSuccess: async () => {
      console.log('Like song mutation success')
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
      console.log('Unlike song mutation success')
      queryClient.refetchQueries({ stale: true });
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error))
        console.log('Unlike song mutation failed: ', error.response?.data);
    },
  });
};
