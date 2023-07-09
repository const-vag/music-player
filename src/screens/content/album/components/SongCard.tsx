import { memo } from 'react';
import { Song } from '../../../../api/requests/songs.api';
import { Box } from '../../../../ui-kit/Box/Box';
import { Typography } from '../../../../ui-kit/Typography';

type SongCardProps = {
  song: Song;
};

const SongCardComponent = ({ song }: SongCardProps) => {
  return (
    <Box ml={0} style={{ alignItems: 'flex-start' }}>
      <Typography variant="titleMedium">{song.name}</Typography>
      <Typography variant="bodySmall">
        {song.artists.map((artist) => artist.name).join(', ')}
      </Typography>
    </Box>
  );
};

export const SongCard = memo(SongCardComponent);
