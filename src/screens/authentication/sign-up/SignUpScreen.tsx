import React from 'react';
import { useSignUp } from './useSignUpScreen';
import { Button } from 'react-native-paper';
import { Typography } from '../../../ui-kit/Typography';
import { Container } from '../../../ui-kit/Container';
import { Spacer } from '../../../ui-kit/Spacer';
import { TextField } from '../../../form-components/TextField/TextField';
import { EMAIL_REGEX } from '../../../shared/email.regex';

export const SignUp = () => {
  const { form, onSubmit } = useSignUp();

  return (
    <Container>
      <Typography variant="headlineMedium">Sign up</Typography>
      <Spacer />
      <TextField
        rules={{
          required: 'Username is required',
        }}
        placeholder="Username"
        name="username"
        control={form.control}
      />
      <Spacer />
      <TextField
        rules={{
          required: 'Email is required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Please enter a valid email!',
          },
        }}
        placeholder="Email"
        name="email"
        control={form.control}
      />
      <Spacer />
      <TextField
        rules={{ required: 'Password is required' }}
        placeholder="Password"
        name="password"
        secureTextEntry
        control={form.control}
      />
      <Spacer />
      <Button onPress={form.handleSubmit(onSubmit)} mode="contained">
        Sign up
      </Button>
      <Spacer />
    </Container>
  );
};
