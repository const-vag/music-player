import React from 'react';
import { IconButton, Text } from 'react-native-paper';
import { Box } from '../../ui-kit/Box/Box';
import { Container } from '../../ui-kit/Container';
import { Image } from 'react-native';
import { usePlayer } from './usePlayer';
import { Spacer } from '../../ui-kit/Spacer';

export const Player = () => {
  const { navigation } = usePlayer();

  return (
    <Container onClose={navigation.goBack}>
      <Image
        style={{
          width: 250,
          height: 250,
        }}
        source={{
          uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2022/02/SNIK1-1-1440x1440.png',
        }}
      />
      <Box direction="row" mb={20}>
        <IconButton
          icon="skip-previous"
          size={54}
          onPress={() => console.log('Pressed')}
        />
        <Spacer mode="horizontal" />
        <IconButton
          icon="play"
          size={84}
          onPress={() => console.log('Pressed')}
        />
        <Spacer mode="horizontal" />
        <IconButton
          icon="skip-next"
          size={54}
          onPress={() => console.log('Pressed')}
        />
      </Box>
      <Box direction="row">
        <Text variant="titleMedium">Snik, Trannos - GAMW TON LIGHT</Text>
        <IconButton
          icon="heart"
          onPress={() => console.log('favourite song snikaros mono')}
          size={34}
        />
      </Box>
    </Container>
  );
};
