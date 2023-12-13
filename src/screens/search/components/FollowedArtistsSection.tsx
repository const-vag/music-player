import React from 'react';
import { Image } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { Artist } from '../../../api/requests/artists.api';
import { Box } from '../../../ui-kit/Box/Box';
import { Typography } from '../../../ui-kit/Typography';

type FollowedArtistsSectionProps = {
  followedArtists: Artist[];
};

const IMAGE_SIZE = 50;

export const FollowedArtistsSection = ({
  followedArtists,
}: FollowedArtistsSectionProps) => {
  const firstNineFollowed = followedArtists.slice(0, 9);

  return (
    <Box style={{ rowGap: 10 }} centered={false}>
      <Typography variant="titleMedium">Followed artists</Typography>
      <Box centered={false} style={{ flexWrap: 'wrap' }} direction="row">
        {firstNineFollowed.map((artist) => (
          <Box p={5} style={{ width: '50%' }} key={artist.id}>
            <Surface style={{ width: '100%' }} elevation={4}>
              <Box
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  columnGap: 15,
                }}
                direction="row"
                transparent
              >
                <Image
                  style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                  source={{ uri: artist.image }}
                />
                <Typography truncate>{artist.name}</Typography>
              </Box>
            </Surface>
          </Box>
        ))}
        <Box p={5} style={{ width: '50%' }}>
          <Button
            style={{ width: '100%' }}
            onPress={() => console.log('TODO: see all followed artists')}
          >
            See all
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
