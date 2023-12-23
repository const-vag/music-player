import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Playlist } from '../../../../api/requests/playlists.api';
import { Box } from '../../../../ui-kit/Box/Box';
import { MaterialIcon } from '../../../../ui-kit/MaterialIcon';
import { Typography } from '../../../../ui-kit/Typography';
import { usePlaylistNavigators } from '../../../playlist/usePlaylistNavigator';

type PlaylistCardProps = {
  playlist: Playlist;
};

const IMAGE_SIZE = 35;

export const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const { goToPlaylist } = usePlaylistNavigators();

  return (
    <TouchableOpacity onPress={() => goToPlaylist(playlist.id)}>
      <Box
        pv={10}
        style={{
          columnGap: 10,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        direction="row"
      >
        <MaterialIcon size={IMAGE_SIZE} name="music-box-outline" />
        <Typography variant="bodyLarge">{playlist.name}</Typography>
      </Box>
    </TouchableOpacity>
  );
};
