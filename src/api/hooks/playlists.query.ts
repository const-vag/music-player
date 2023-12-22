import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPlaylistRequest,
  getPlaylistsRequest,
} from '../requests/playlists.api';
import { isAxiosError } from 'axios';
import { ErrorResponse } from '../shared-types';

const PLAYLISTS_QUERY_KEY = 'playlists';

export const usePlaylistsQuery = () => {
  return useQuery(
    [PLAYLISTS_QUERY_KEY],
    async () => await getPlaylistsRequest(),
    {
      onError: (error) => {
        if (isAxiosError<ErrorResponse>(error)) {
          console.log('🚀 ~ usePlaylistsQuery ~ error:', error.response?.data);
        }
      },
    }
  );
};

export const useCreatePlaylistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlaylistRequest,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [PLAYLISTS_QUERY_KEY] });
    },
  });
};
