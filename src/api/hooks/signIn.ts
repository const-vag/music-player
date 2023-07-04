import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { SignInErrorResponse, signInRequest } from "../requests/signIn";
import { AUTH_TOKEN_KEY } from "../../shared/hooks/useAuthToken";

export const useSignInMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInRequest,
    onSuccess: (res) => {
      queryClient.setQueryData([AUTH_TOKEN_KEY], res);
    },
    onError: (error) => {
      if (isAxiosError<SignInErrorResponse>(error))
        console.log("Sign in mutation failed: ", error.response?.data);
    },
  });
};
