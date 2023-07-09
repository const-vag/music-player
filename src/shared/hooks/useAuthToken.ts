import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTH_TOKEN_KEY = 'auth-token';

export const useAuthToken = () => {
  const { data } = useQuery<string | null>(
    [AUTH_TOKEN_KEY],
    async () => await AsyncStorage.getItem(AUTH_TOKEN_KEY),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );
  return data;
};
