import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Button } from 'react-native-paper';
import { AUTH_TOKEN_KEY } from '../../shared/hooks/useAuthToken';
import { Container } from '../../ui-kit/Container';

export const More = () => {
  const queryClient = useQueryClient();

  return (
    <Container>
      <Button
        mode="contained"
        onPress={async () => {
          await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
          queryClient.resetQueries({ queryKey: [AUTH_TOKEN_KEY] });
        }}
      >
        Logout
      </Button>
    </Container>
  );
};
