import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { SignUpFormValues } from './types';
import { useSignUpMutation } from '../../../api/hooks/signUp.query';

export const useSignUpScreen = () => {
  const form = useForm<SignUpFormValues>();
  const { mutate, ...signUpMutation } = useSignUpMutation();

  const onSubmit = (values: SignUpFormValues) => {
    Keyboard.dismiss();
    mutate(values);
  };

  return {
    form,
    onSubmit,
    signUpMutation,
  };
};
