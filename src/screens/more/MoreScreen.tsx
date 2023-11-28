import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Button } from 'react-native-paper';
import { AUTH_TOKEN_KEY } from '../../shared/hooks/useAuthToken';
import { Container } from '../../ui-kit/Container';
import { ASYNC_STORAGE_SONG_KEY } from '../../shared/stores/player/usePlayerControls';
import { asyncStorage } from '../../shared/hooks/useAsyncStorage';

export const More = () => {
  const queryClient = useQueryClient();
  const { remove } = asyncStorage();

  return (
    <Container>
      <Button
        mode="contained"
        onPress={async () => {
          await remove(ASYNC_STORAGE_SONG_KEY);
          await remove(AUTH_TOKEN_KEY);
          queryClient.resetQueries({ queryKey: [AUTH_TOKEN_KEY] });
        }}
      >
        Logout
      </Button>
    </Container>
  );
};
