import React, { memo } from 'react';
import { Box } from '../../../../ui-kit/Box/Box';
import { Album } from '../../../../api/requests/albums.api';
import { Image } from 'react-native';
import { Typography } from '../../../../ui-kit/Typography';
import { uiVariables } from '../../../../ui-kit/variables';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSearchContent } from '../../../search/useSearchContent';

type AlbumCardProps = {
  album: Album;
};

const IMAGE_SIZE = 60;

const AlbumCardComponent = ({ album }: AlbumCardProps) => {
  const { goToAlbum } = useSearchContent();

  return (
    <TouchableOpacity onPress={() => goToAlbum(album.id)}>
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
