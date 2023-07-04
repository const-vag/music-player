import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { useSignInMutation } from "../../../api/hooks/signIn";
import { SignInFormValues } from "./types";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationRouteParamList, AuthenticationRoutes } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

export const useSignIn = () => {
  const form = useForm<SignInFormValues>();
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
