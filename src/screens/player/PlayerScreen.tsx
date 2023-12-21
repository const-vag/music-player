import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNextSongQuery } from '../../api/hooks/songs.query';
import { useMiniPlayerControls } from '../../shared/stores/player/MiniPlayerStore';
import { usePlayerControls } from '../../shared/stores/player/usePlayerControls';
import { usePlayerStore } from '../../shared/stores/player/usePlayerStore';
import { useSnackbarControls } from '../../shared/stores/snackbar/useSnackbarControls';
import { Box } from '../../ui-kit/Box/Box';
import { Container } from '../../ui-kit/Container';
import { Spacer } from '../../ui-kit/Spacer';
import { Typography } from '../../ui-kit/Typography';

export const Player = () => {
  const navigation = useNavigation();
  const { play, pause, updateAndPlaySong } = usePlayerControls();
  const { song: currentSong, isPlaying } = usePlayerStore();
  const { data: nextSong } = useNextSongQuery(currentSong?.id);
  const { show } = useSnackbarControls();
  const { hideMiniPlayer, showMiniPlayer } = useMiniPlayerControls();

  useEffect(() => {
    hideMiniPlayer();
    return () => showMiniPlayer();
  }, [showMiniPlayer, hideMiniPlayer]);

  if (!currentSong) {
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
          uri: currentSong.albumImage,
        }}
      />
      <Box direction="row" mb={20}>
        <IconButton
          disabled
          icon="skip-previous"
          size={54}
          onPress={() => play(currentSong.link)}
        />
        <Spacer mode="horizontal" />
        {isPlaying ? (
          <IconButton icon={'pause'} size={84} onPress={pause} />
        ) : (
          <IconButton
            icon={'play'}
            size={84}
            onPress={() => play(currentSong.link)}
          />
        )}
        <Spacer mode="horizontal" />
        <IconButton
          icon="skip-next"
          size={54}
          onPress={() => {
            if (!nextSong)
              show('Unable to play next song right now, try again later.');
            else updateAndPlaySong(nextSong);
          }}
        />
      </Box>
      <Box style={{ justifyContent: 'space-between' }} direction="column">
        <Typography variant="titleMedium">{currentSong?.name}</Typography>
        <Typography variant="bodyMedium">
          {currentSong.artists.map((artist) => artist.name).join(', ')}
        </Typography>
      </Box>
    </Container>
  );
};
