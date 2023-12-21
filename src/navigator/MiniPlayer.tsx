import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { AnimatedFAB, FAB, Portal } from 'react-native-paper';
import { SongWithAlbumImage } from '../api/requests/songs.api';
import { useMiniPlayerStore } from '../shared/stores/player/MiniPlayerStore';
import { usePlayerStore } from '../shared/stores/player/usePlayerStore';
import { MainStackParamList, MainStackRoutes } from './types';
import { usePlayerControls } from '../shared/stores/player/usePlayerControls';
import { useSnackbarControls } from '../shared/stores/snackbar/useSnackbarControls';
import { useNextSongQuery } from '../api/hooks/songs.query';

export const MiniPlayer = () => {
  const { song } = usePlayerStore();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardOpenedEvent = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardClosedEvent = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardOpenedEvent.remove();
      keyboardClosedEvent.remove();
    };
  }, []);

  if (!song) return null;

  return (
    <MiniPlayerContent song={song} isKeyboardVisible={isKeyboardVisible} />
  );
};

type MiniPlayerProps = {
  song: SongWithAlbumImage;
  isKeyboardVisible: boolean;
};

const MiniPlayerContent = (props: MiniPlayerProps) => {
  const { song, isKeyboardVisible } = props;
  const { isVisible, isMinimized } = useMiniPlayerStore();
  const [state, setState] = React.useState<{ open: boolean }>({ open: false });
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { play, pause, updateAndPlaySong } = usePlayerControls();
  const { show } = useSnackbarControls();
  const { isPlaying } = usePlayerStore();
  const { data: nextSong } = useNextSongQuery(song?.id);
  const [minimized, setMinimized] = useState(false);

  const openExtendedPlayer = () => navigation.navigate(MainStackRoutes.PLAYER);

  const togglePausePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play(song.link);
    }
  };

  useEffect(() => {
    setMinimized(isMinimized);
  }, [isMinimized]);

  return (
    <Portal>
      <AnimatedFAB
        icon={isPlaying ? 'pause' : 'play'}
        label={song.name}
        extended={false}
        onLongPress={() => setMinimized((prev) => !prev)}
        onPress={togglePausePlay}
        visible={minimized}
        animateFrom={'right'}
        style={[styles.collapsedFab]}
      />
      <FAB.Group
        style={[styles.fabContainer]}
        open={state.open}
        visible={isVisible && !isKeyboardVisible && !minimized}
        onLongPress={() => setMinimized(true)}
        icon={'music-note'}
        label={song.name}
        actions={[
          {
            icon: 'arrow-expand-up',
            label: 'Expand player',
            onPress: openExtendedPlayer,
          },
          {
            icon: 'minus',
            label: 'Minimize',
            onPress: () => setMinimized(false),
          },
          {
            icon: 'skip-next',
            label: 'Next',
            onPress: () => {
              if (!nextSong)
                show('Unable to play next song right now, try again later.');
              else updateAndPlaySong(nextSong);
            },
          },
          {
            icon: isPlaying ? 'pause' : 'play',
            label: isPlaying ? 'Pause' : 'Play',
            onPress: togglePausePlay,
          },
        ]}
        onStateChange={({ open }) => setState({ open })}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    paddingBottom: 70,
  },
  collapsedFab: {
    bottom: 86,
    right: 16,
    position: 'absolute',
  },
});
