import React from 'react';
import { Container } from './Container';
import { ActivityIndicator } from 'react-native-paper';

export const LoadingScreen = () => {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
};
