import { memo } from 'react';
import { Song } from '../../../../api/requests/songs.api';
import { Box } from '../../../../ui-kit/Box/Box';
import { Typography } from '../../../../ui-kit/Typography';
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSongCard } from './useSongCard';
import React from 'react';
import { usePlayerControls } from '../../../../shared/stores/player/usePlayerControls';

type SongCardProps = {
  song: Song;
  albumImage: string;
};

const SongCardComponent = ({ song, albumImage }: SongCardProps) => {
  const { likeSongMutation, show } = useSongCard();
  const { updateAndPlaySong } = usePlayerControls();

  return (
    <TouchableOpacity
      onPress={
        song.link
          ? () => updateAndPlaySong({ ...song, albumImage })
          : () =>
              show("Song can't play right now, try again later.")
      }
    >
      <Box expand>
        <Box
          style={{
            justifyContent: 'space-between',
          }}
          direction="row"
        >
          <Box style={{ alignItems: 'flex-start' }}>
            <Typography variant="titleMedium">{song.name}</Typography>
            <Typography variant="bodySmall">
              {song.artists.map((artist) => artist.name).join(', ')}
            </Typography>
          </Box>
          <IconButton
            icon="heart"
            onPress={() => likeSongMutation.mutate(song.id)}
          />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export const SongCard = memo(SongCardComponent);
