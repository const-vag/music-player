import React, { memo } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Album } from '../../../../api/requests/albums.api';
import { Box } from '../../../../ui-kit/Box/Box';
import { Typography } from '../../../../ui-kit/Typography';
import { uiVariables } from '../../../../ui-kit/variables';

type AlbumCardProps = {
  album: Album;
  onPress: () => void;
};

const IMAGE_SIZE = 60;

const AlbumCardComponent = ({ album, onPress }: AlbumCardProps) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <Box ph={uiVariables.spacer.horizontalPadding} direction="row">
        <Image
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
          source={{ uri: album.image }}
        />
        <Box ml={10} style={{ alignItems: 'flex-start' }}>
          <Typography variant="titleMedium">{album.name}</Typography>
          <Typography variant="bodySmall">
            {new Date(album.releaseDate).getFullYear()}
          </Typography>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export const AlbumCard = memo(AlbumCardComponent);
