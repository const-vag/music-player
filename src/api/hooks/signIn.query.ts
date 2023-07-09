import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { signInRequest } from '../requests/signIn.api';
import { AUTH_TOKEN_KEY } from '../../shared/hooks/useAuthToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorResponse } from '../shared-types';

export const useSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInRequest,
    onSuccess: async (res) => {
      queryClient.setQueryData([AUTH_TOKEN_KEY], res.access_token);
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, res.access_token);
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error))
        console.log('Sign in mutation failed: ', error.response?.data);
    },
  });
};
