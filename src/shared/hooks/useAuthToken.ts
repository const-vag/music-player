import { useQuery, useQueryClient } from "@tanstack/react-query";

export const AUTH_TOKEN_KEY = "auth-token";

export const useAuthToken = () => {
  // const queryClient = useQueryClient();
  // const authToken = queryClient.getQueryData<string>([AUTH_TOKEN_KEY]);
  const { data } = useQuery<string>([AUTH_TOKEN_KEY]);
  return data;
};
