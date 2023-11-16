import React from 'react';
import { Typography } from '../../../ui-kit/Typography';
import { SongWithAlbumImage } from '../../../api/requests/songs.api';
import { TouchableOpacity, Image } from 'react-native';
import { Box } from '../../../ui-kit/Box/Box';
import { usePlayerControls } from '../../../shared/stores/player/usePlayerControls';

type SearchSongResultProps = {
  song: SongWithAlbumImage;
};

const IMAGE_SIZE = 50;

export const SearchSongResult = ({ song }: SearchSongResultProps) => {
  const { updateAndPlaySong } = usePlayerControls();

  return (
    <TouchableOpacity onPress={() => updateAndPlaySong(song)}>
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

// return (
//     <TouchableOpacity onPress={() => console.log('item clicked')}>
//       <Box
//         centered={false}
//         ph={uiVariables.spacer.horizontalPadding}
//         direction="row"
//       >
//         <Image
//           style={{ width: 35, height: 35 }}
//           source={{ uri: item.albumImage }}
//         />
//         <Box ml={10} style={{ alignItems: 'flex-start' }}>
//           <Typography variant="titleMedium">{item.name}</Typography>
//         </Box>
//       </Box>
//     </TouchableOpacity>
//   );
