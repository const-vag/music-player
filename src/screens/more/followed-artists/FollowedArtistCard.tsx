import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useContentNavigators } from '../../content/useContentNavigators';
import { Artist } from '../../../api/requests/artists.api';
import { Box } from '../../../ui-kit/Box/Box';
import { Typography } from '../../../ui-kit/Typography';
import { useUnfollowMutation } from '../../../api/hooks/artists.query';
import { IconButton } from 'react-native-paper';

type FollowedArtistCardProps = {
  artist: Artist;
};

const IMAGE_SIZE = 50;

export const FollowedArtistCard = ({ artist }: FollowedArtistCardProps) => {
  const { goToArtist } = useContentNavigators();
  const { mutate } = useUnfollowMutation();

  return (
    <TouchableOpacity onPress={() => goToArtist(artist.id)}>
      <Box centered={false} expand>
        <Box
          style={{
            justifyContent: 'space-between',
          }}
          direction="row"
        >
          <Box direction="row" style={{ columnGap: 10, flex: 1 }}>
            <Image
              source={{ uri: artist.image }}
              style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
            />
            <Typography truncate variant="titleMedium">
              {artist.name}
            </Typography>
          </Box>
          <IconButton
            icon="minus-circle-outline"
            onPress={() => mutate(artist.id)}
          />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
