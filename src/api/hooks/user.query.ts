import { isAxiosError } from 'axios';
import { useAuthToken } from '../../shared/hooks/useAuthToken';
import { getUser } from '../requests/user.api';
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
