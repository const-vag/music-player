import React from 'react';
import { useSignInScreen } from './useSignInScreen';
import { Button } from 'react-native-paper';
import { Typography } from '../../../ui-kit/Typography';
import { Container } from '../../../ui-kit/Container';
import { Spacer } from '../../../ui-kit/Spacer';
import { TextField } from '../../../form-components/TextField/TextField';
import { EMAIL_REGEX } from '../../../shared/email.regex';
import { Box } from '../../../ui-kit/Box/Box';

export const SignIn = () => {
  const { form, onSubmit, goToSignUp } = useSignInScreen();

  return (
    <Container>
      <Typography variant="headlineMedium">Sign in</Typography>
      <Spacer />
      <Box ph={30}>
        <TextField
          sizeVariant="full-size"
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
          sizeVariant="full-size"
          rules={{ required: 'Password is required' }}
          placeholder="Password"
          name="password"
          secureTextEntry
          control={form.control}
        />
      </Box>
      <Spacer />
      <Button onPress={form.handleSubmit(onSubmit)} mode="contained">
        Login
      </Button>
      <Spacer />
      <Button onPress={goToSignUp}>Not having an account? Sign up</Button>
    </Container>
  );
};
