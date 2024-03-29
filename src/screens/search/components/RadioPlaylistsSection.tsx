import React from 'react';
import { useRadioPlaylistsQuery } from '../../../api/hooks/playlists.query';
import { Box } from '../../../ui-kit/Box/Box';
import { Typography } from '../../../ui-kit/Typography';
import RadioPlaylistContentCard from './RadioPlaylistContentCard';
import { usePlaylistNavigators } from '../../playlist/usePlaylistNavigator';

export const RadioPlaylistsSection = () => {
  const { data: radioPlaylists, isSuccess } = useRadioPlaylistsQuery();
  const { goToPlaylist } = usePlaylistNavigators();

  if (!isSuccess) return null;

  return (
    <Box style={{ rowGap: 10 }} centered={false}>
      <Typography variant="titleMedium">Daily radio</Typography>
      <Box centered={false} style={{ flexWrap: 'wrap' }} direction="row">
        {radioPlaylists?.map((playlist) => (
          <RadioPlaylistContentCard
            name={playlist.name}
            onPress={() => goToPlaylist(playlist.id)}
            key={playlist.id}
          />
        ))}
      </Box>
    </Box>
  );
};
