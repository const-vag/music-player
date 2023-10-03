import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { useSignInMutation } from '../../../api/hooks/signIn.query';
import { SignInFormValues } from './types';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationRouteParamList, AuthenticationRoutes } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { DEFAULT_EMAIL, DEFAULT_PASSWORD } from '@env';

export const useSignInScreen = () => {
  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
    },
  });
  const navigation =
    useNavigation<StackNavigationProp<AuthenticationRouteParamList>>();
  const { mutate, ...signInMutation } = useSignInMutation();

  const onSubmit = (values: SignInFormValues) => {
    Keyboard.dismiss();
    mutate(values);
  };

  const goToSignUp = () => {
    navigation.navigate(AuthenticationRoutes.SIGNUP);
  };

  return {
    form,
    onSubmit,
    signInMutation,
    goToSignUp,
  };
};
