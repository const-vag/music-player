import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { AnimatedFAB, FAB, Portal } from 'react-native-paper';
import { SongWithAlbumImage } from '../api/requests/songs.api';
import {
  useMiniPlayerControls,
  useMiniPlayerStore,
} from '../shared/stores/player/MiniPlayerStore';
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
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  const [state, setState] = React.useState<{ open: boolean }>({ open: false });

  const { data: nextSong } = useNextSongQuery(song?.id);

  const { isPlaying } = usePlayerStore();
  const { isVisible, isMinimized } = useMiniPlayerStore();

  const { play, pause, updateAndPlaySong } = usePlayerControls();
  const { show } = useSnackbarControls();
  const { maximize, minimize } = useMiniPlayerControls();

  const openExtendedPlayer = () => navigation.navigate(MainStackRoutes.PLAYER);

  const togglePausePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play(song.link);
    }
  };

  return (
    <Portal>
      <AnimatedFAB
        icon={isPlaying ? 'pause' : 'play'}
        label={song.name}
        extended={false}
        onLongPress={() => (isMinimized ? maximize() : minimize())}
        onPress={togglePausePlay}
        visible={isMinimized}
        style={[styles.collapsedFab]}
      />
      <FAB.Group
        style={[styles.fabContainer]}
        open={state.open}
        visible={isVisible && !isKeyboardVisible && !isMinimized}
        onLongPress={minimize}
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
            onPress: minimize,
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
    paddingBottom: 130,
  },
  collapsedFab: {
    bottom: 146,
    right: 16,
    position: 'absolute',
  },
});
