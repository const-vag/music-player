import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { Box } from '../ui-kit/Box/Box';
import { usePlayerStore } from '../shared/usePlayerStore';
import { usePlayerControls } from '../shared/usePlayerControls';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList, BottomTabRoutes } from './types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity, Image } from 'react-native';
import { Typography } from '../ui-kit/Typography';

const IMAGE_SIZE = 50;

export const MiniPlayer = () => {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<BottomTabParamList>>();
  const { bottom } = useSafeAreaInsets();

  const { song, isPlaying } = usePlayerStore();
  const { play, pause } = usePlayerControls();

  if (!song) return null;

  return (
    <TouchableOpacity
      onLongPress={() => navigation.navigate(BottomTabRoutes.PLAYER)}
    >
      <Box
        direction="row"
        style={{
          width: '100%',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: bottom + 85,
          backgroundColor: theme.colors.onSecondary,
        }}
      >
        <Box transparent direction="row">
          <Image
            style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
            source={{ uri: song?.albumImage }}
          />
          <Box
            transparent
            ml={20}
            style={{
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="titleMedium">{song.name}</Typography>
            <Typography variant="bodySmall">
              {song.artists.map((artist) => artist.name).join(', ')}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onPress={() => (isPlaying ? pause() : play(song.link))}
          icon={isPlaying ? 'pause' : 'play'}
        />
      </Box>
    </TouchableOpacity>
  );
};
