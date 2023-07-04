import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { useSignInMutation } from "../../../api/hooks/signIn";
import { SignUpFormValues } from "./types";

export const useSignIn = () => {
  const form = useForm<SignUpFormValues>();
  const { mutate, ...signUpMutation } = useSignInMutation();

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
