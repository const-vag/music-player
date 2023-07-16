import React from 'react';
import { Button } from 'react-native-paper';
import { Container } from '../../ui-kit/Container';
import { useSearchMain } from './useSearchMain';
import { Spacer } from '../../ui-kit/Spacer';

export const SearchMain = () => {
  const { goToHawkTsibouki } = useSearchMain();
  return (
    <Container>
      <Spacer />
      <Button mode="contained" onPress={goToHawkTsibouki}>
        Go to hawk
      </Button>
    </Container>
  );
};
