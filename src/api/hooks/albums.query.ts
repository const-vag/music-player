import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { ErrorResponse } from '../shared-types';
import { getAlbumRequest } from '../requests/albums.api';

export const useAlbumQuery = (id: number) => {
  return useQuery(['album', id], async () => await getAlbumRequest(id), {
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
