import { useForm } from "react-hook-form";
import { FormValues } from "./types";
import { Keyboard } from "react-native";
import axios, { AxiosError } from "axios";
import { API_URL } from "@env";

const url = `${API_URL}/auth/signin`;

export const useSignIn = () => {
  const form = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    Keyboard.dismiss();
    try {
      const res = await axios.post(url, values);
      console.log("res: ", res.data);
    } catch (err) {
      const error = err as AxiosError;
      console.log("error: ", error.response?.data);
    }
  };

  return {
    form,
    onSubmit,
  };
};
