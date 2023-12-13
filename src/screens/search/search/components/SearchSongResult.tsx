import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { SongWithAlbumImage } from '../../../../api/requests/songs.api';
import { useRecentlySearched } from '../../../../shared/hooks/useRecentlySearched';
import { usePlayerControls } from '../../../../shared/stores/player/usePlayerControls';
import { Box } from '../../../../ui-kit/Box/Box';
import { Typography } from '../../../../ui-kit/Typography';

type SearchSongResultProps = {
  song: SongWithAlbumImage;
};

const IMAGE_SIZE = 50;

export const SearchSongResult = ({ song }: SearchSongResultProps) => {
  const { updateAndPlaySong } = usePlayerControls();
  const { write } = useRecentlySearched();

  const handlePress = async () => {
    await write.song(song);
    updateAndPlaySong(song);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Box
        style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
        transparent
        direction="row"
      >
        <Image
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
          source={{ uri: song.albumImage }}
        />
        <Box
          transparent
          ml={20}
          style={{
            alignItems: 'flex-start',
          }}
        >
          <Typography truncate variant="titleMedium">
            {song.name}
          </Typography>
          <Typography truncate variant="bodySmall">
            {song.artists.map((artist) => artist.name).join(', ')}
          </Typography>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
