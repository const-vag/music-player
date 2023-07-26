import { API_URL } from '@env';
import axios from 'axios';
import { SignInFormValues } from '../../screens/authentication/sign-in/types';

const signUpUrl = `${API_URL}/auth/signup`;

export type SignUpSuccessResponse = {
  access_token: string;
};

export const signUpRequest = async (values: SignInFormValues) => {
  return (await axios.post<SignUpSuccessResponse>(signUpUrl, values)).data;
};
