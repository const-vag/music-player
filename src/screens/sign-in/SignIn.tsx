import React from "react";
import { Container } from "../../ui-kit/Container";
import { Typography } from "../../ui-kit/Typography";
import { TextField } from "../../form-components/TextField/TextField";
import { useSignIn } from "./useSignIn";
import { Button } from "react-native-paper";
import { Spacer } from "../../ui-kit/Spacer";

export const SignIn = () => {
  const { form, onSubmit } = useSignIn();

  return (
    <Container>
      <Typography variant="headlineMedium">Sign in</Typography>
      <Spacer />
      <TextField
        rules={{
          required: "Email is required",
        }}
        placeholder="Email"
        name="email"
        control={form.control}
      />
      <Spacer />
      <TextField
        rules={{ required: "Password is required" }}
        placeholder="Password"
        name="password"
        secureTextEntry
        control={form.control}
      />
      <Spacer />
      <Button onPress={form.handleSubmit(onSubmit)} mode="contained">
        Login
      </Button>
    </Container>
  );
};
