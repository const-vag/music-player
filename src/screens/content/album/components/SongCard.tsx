import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import {
  useLikeSongMutation,
  useUnlikeSongMutation,
} from '../../../../api/hooks/songs.query';
import { Song } from '../../../../api/requests/songs.api';
import { usePlayerControls } from '../../../../shared/stores/player/usePlayerControls';
import { useSnackbarControls } from '../../../../shared/stores/snackbar/useSnackbarControls';
import { Box } from '../../../../ui-kit/Box/Box';
import { Typography } from '../../../../ui-kit/Typography';

type SongCardProps = {
  song: Song;
  albumImage: string;
};

const SongCardComponent = ({ song, albumImage }: SongCardProps) => {
  const { updateAndPlaySong } = usePlayerControls();
  const { show } = useSnackbarControls();
  const likeSongMutation = useLikeSongMutation();
  const unlikeSongMutation = useUnlikeSongMutation();

  return (
    <TouchableOpacity
      onPress={
        song.link
          ? () => updateAndPlaySong({ ...song, albumImage })
          : () => show("Song can't play right now, try again later.")
      }
    >
      <Box centered={false} expand>
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
            icon={song.liked ? 'heart' : 'heart-outline'}
            onPress={
              song.liked
                ? () => unlikeSongMutation.mutate(song.id)
                : () => likeSongMutation.mutate(song.id)
            }
          />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export const SongCard = memo(SongCardComponent);
