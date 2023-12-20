import { isAxiosError } from 'axios';
import { useAuthToken } from '../../shared/hooks/useAuthToken';
import {
  getFavoriteSongs,
  getFollowedArtists,
  getUser,
} from '../requests/user.api';
import { ErrorResponse } from '../shared-types';
import { useQuery } from '@tanstack/react-query';

const USER_QUERY_KEY = 'user';
export const useUserQuery = () => {
  const authToken = useAuthToken();

  return useQuery([USER_QUERY_KEY, authToken], getUser, {
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

const FAVORITE_SONGS_QUERY_KEY = 'favorite_songs';
export const useFavouriteSongsQuery = () => {
  const authToken = useAuthToken();

  return useQuery([FAVORITE_SONGS_QUERY_KEY, authToken], getFavoriteSongs, {
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(
          '🚀 ~ useFavouriteSongsQuery ~ error:',
          error.response?.data
        );
      }
    },
  });
};

const FOLLOWED_ARTISTS_QUERY_KEY = 'followed_artists';
export const useFollowedArtistsQuery = () => {
  const authToken = useAuthToken();

  return useQuery([FOLLOWED_ARTISTS_QUERY_KEY, authToken], getFollowedArtists, {
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
