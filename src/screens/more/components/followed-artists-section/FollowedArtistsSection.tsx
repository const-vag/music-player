import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button } from 'react-native-paper';
import { useFollowedArtistsQuery } from '../../../../api/hooks/user.query';
import { Box } from '../../../../ui-kit/Box/Box';
import { Typography } from '../../../../ui-kit/Typography';
import { useContentNavigators } from '../../../content/useContentNavigators';
import { MoreRoutes, MoreStackParamList } from '../../types';
import { FollowedArtistsContentCard } from './FollowedArtistsContentCard';

export const FollowedArtistsSection = () => {
  const { data: followedArtists } = useFollowedArtistsQuery();
  const navigation = useNavigation<StackNavigationProp<MoreStackParamList>>();
  const { goToArtist } = useContentNavigators();

  if (!followedArtists) return null;

  const firstNineFollowed = followedArtists.slice(0, 7);

  return (
    <Box style={{ rowGap: 10 }} centered={false}>
      <Typography variant="titleMedium">Followed artists</Typography>
      <Box centered={false} style={{ flexWrap: 'wrap' }} direction="row">
        {firstNineFollowed.map((artist) => (
          <FollowedArtistsContentCard
            imageSrc={artist.image}
            name={artist.name}
            onPress={() => goToArtist(artist.id)}
            key={artist.id}
          />
        ))}
        <Box p={5} style={{ width: '50%' }}>
          <Button
            style={{ width: '100%' }}
            onPress={() =>
              navigation.navigate(MoreRoutes.FOLLOWED_ARTISTS_SCREEN)
            }
          >
            See all
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
