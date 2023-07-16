import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ErrorResponse } from '../shared-types';
import { getAlbumRequest } from '../requests/albums.api';

export const ALBUM_QUERY_KEY = 'album';

export const useAlbumQuery = (id: number) => {
  return useQuery([ALBUM_QUERY_KEY, id], async () => await getAlbumRequest(id), {
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error)) {
        console.log(
          '🚀 ~ file: albums.ts:11 ~ useAlbumQuery ~ error:',
          error.response?.data
        );
      }
    },
  });
};
