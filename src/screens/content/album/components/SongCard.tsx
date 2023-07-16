import { memo } from 'react';
import { Song } from '../../../../api/requests/songs.api';
import { Box } from '../../../../ui-kit/Box/Box';
import { Typography } from '../../../../ui-kit/Typography';
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSongCard } from './useSongCard';

type SongCardProps = {
  song: Song;
};

const SongCardComponent = ({ song }: SongCardProps) => {
  const { likeSongMutation } = useSongCard();
  return (
    <TouchableOpacity onPress={() => console.log('Play song...')}>
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
