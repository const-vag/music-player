import React from 'react';
import { Button } from 'react-native-paper';
import { Container } from '../../ui-kit/Container';
import { useSearchMainScreen } from './useSearchMainScreen';
import { Spacer } from '../../ui-kit/Spacer';

export const SearchMain = () => {
  const { goToSearchPage, goToHawkTsibouki } = useSearchMainScreen();
  return (
    <Container expand centered={false}>
      <Button
        contentStyle={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}
        style={{ borderRadius: 5 }}
        mode="contained"
        icon="magnify"
        onPress={goToSearchPage}
      >
        Search
      </Button>
      <Spacer />
      <Button mode="contained" onPress={goToHawkTsibouki}>
        Go to hawk
      </Button>
    </Container>
  );
};
