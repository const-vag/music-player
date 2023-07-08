import { API_URL } from "@env";
import axios from "axios";
import { SignInFormValues } from "../../screens/authentication/sign-in/types";

const signInUrl = `${API_URL}/auth/signin`;

export type SignInSuccessResponse = {
  access_token: string;
};

export const signInRequest = async (values: SignInFormValues) => {
  return (await axios.post<SignInSuccessResponse>(signInUrl, values)).data;
};
