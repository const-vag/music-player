import React from 'react';
import { Button } from 'react-native-paper';
import { Container } from '../../ui-kit/Container';
import { useHomeScreen } from './useHomeScreen';
import { Spacer } from '../../ui-kit/Spacer';
import { useUserQuery } from '../../api/hooks/user.query';

export const HomeScreen = () => {
  const { goToSearchPage, goToHawkTsibouki } = useHomeScreen();
  const { data: user } = useUserQuery();
  // console.log('🚀 ~ file: SearchMainScreen.tsx:11 ~ SearchMain ~ user:', user);

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
      {/* <Button mode="contained" onPress={goToHawkTsibouki}>
        Go to hawk
      </Button> */}
    </Container>
  );
};
