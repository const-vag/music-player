import React from 'react';
import { useRadioPlaylistsQuery } from '../../../api/hooks/playlists.query';
import { Box } from '../../../ui-kit/Box/Box';
import { Typography } from '../../../ui-kit/Typography';
import RadioPlaylistContentCard from './RadioPlaylistContentCard';

export const RadioPlaylistsSection = () => {
  const { data: radioPlaylists, isSuccess } = useRadioPlaylistsQuery();

  if (!isSuccess) return null;

  return (
    <Box style={{ rowGap: 10 }} centered={false}>
      <Typography variant="titleMedium">Daily radio</Typography>
      <Box centered={false} style={{ flexWrap: 'wrap' }} direction="row">
        {radioPlaylists?.map((playlist) => (
          <RadioPlaylistContentCard
            name={playlist.name}
            onPress={() => console.log('radio playlist pressed')}
            key={playlist.id}
          />
        ))}
      </Box>
    </Box>
  );
};
