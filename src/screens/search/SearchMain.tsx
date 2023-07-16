import React from 'react';
import { Button } from 'react-native-paper';
import { Container } from '../../ui-kit/Container';
import { useSearchMain } from './useSearchMain';

export const SearchMain = () => {
  const { goToHawkTsibouki } = useSearchMain();
  return (
    <Container>
      <Button mode="contained" onPress={goToHawkTsibouki}>
        Go to hawk
      </Button>
    </Container>
  );
};
