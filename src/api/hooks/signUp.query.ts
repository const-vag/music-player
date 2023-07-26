import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { AUTH_TOKEN_KEY } from '../../shared/hooks/useAuthToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorResponse } from '../shared-types';
import { signUpRequest } from '../requests/signUp.api';

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUpRequest,
    onSuccess: async (res) => {
      queryClient.setQueryData([AUTH_TOKEN_KEY], res.access_token);
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, res.access_token);
    },
    onError: (error) => {
      if (isAxiosError<ErrorResponse>(error))
        console.log('Sign up mutation failed: ', error.response?.data);
    },
  });
};
