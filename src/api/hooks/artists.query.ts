import { useQuery } from '@tanstack/react-query';
import { getArtistRequest } from '../requests/artists.api';
import { isAxiosError } from 'axios';
import { ErrorResponse } from '../shared-types';

const ARTIST_QUERY_KEY = 'artist'
export const useArtistQuery = (id: number) => {
  return useQuery([ARTIST_QUERY_KEY, id], async () => await getArtistRequest(id), {
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(
          '🚀 ~ file: artists.ts:12 ~ useArtistQuery ~ error:',
          error.response?.data
        );
      }
    },
  });
};
