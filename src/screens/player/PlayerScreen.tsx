import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { usePlayerControls } from '../../shared/stores/player/usePlayerControls';
import { usePlayerStore } from '../../shared/stores/player/usePlayerStore';
import { Box } from '../../ui-kit/Box/Box';
import { Container } from '../../ui-kit/Container';
import { Spacer } from '../../ui-kit/Spacer';

export const Player = () => {
  const navigation = useNavigation();
  const { play, pause } = usePlayerControls();
  const { song, isPlaying } = usePlayerStore();

  if (!song) {
    navigation.goBack();
    return null;
  }

  return (
    <Container
      variant="modal"
      topAwareSpacer={false}
      onClose={navigation.goBack}
    >
      <Image
        style={{
          width: 250,
          height: 250,
        }}
        source={{
          uri: song.albumImage,
        }}
      />
      <Box direction="row" mb={20}>
        <IconButton
          icon="skip-previous"
          size={54}
          onPress={() => console.log('Pressed')}
        />
        <Spacer mode="horizontal" />
        {isPlaying ? (
          <IconButton icon={'pause'} size={84} onPress={pause} />
        ) : (
          <IconButton icon={'play'} size={84} onPress={() => play(song.link)} />
        )}
        <Spacer mode="horizontal" />
        <IconButton
          icon="skip-next"
          size={54}
          onPress={() => console.log('Pressed')}
        />
      </Box>
      <Box style={{ justifyContent: 'space-between' }} direction="row">
        <Text variant="titleMedium">{song?.name}</Text>
        <IconButton
          icon="heart"
          onPress={() => console.log('favourite song snikaros mono')}
          size={34}
        />
      </Box>
    </Container>
  );
};
