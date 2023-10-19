import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  followArtist,
  getArtistRequest,
  unfollowArtist,
} from '../requests/artists.api';
import { isAxiosError } from 'axios';
import { ErrorResponse } from '../shared-types';

const ARTIST_QUERY_KEY = 'artist';
export const useArtistQuery = (id: number) => {
  return useQuery(
    [ARTIST_QUERY_KEY, id],
    async () => await getArtistRequest(id),
    {
      onError: (error) => {
        if (isAxiosError<ErrorResponse>(error)) {
          console.log(
            '🚀 ~ file: artists.ts:12 ~ useArtistQuery ~ error:',
            error.response?.data
          );
        }
      },
    }
  );
};

export const useFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followArtist,
    onSuccess: async () => {
      console.log('Follow artist mutation success');
      queryClient.refetchQueries({ stale: true });
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error))
        console.log('Follow artist mutation failed: ', error.response?.data);
    },
  });
};

export const useUnfollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowArtist,
    onSuccess: async () => {
      console.log('Unfollow artist mutation success');
      queryClient.refetchQueries({ stale: true });
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error))
        console.log('Unfollow artist mutation failed: ', error.response?.data);
    },
  });
};
