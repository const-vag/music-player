import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useFollowedArtistsQuery } from '../../../api/hooks/user.query';
import { Artist } from '../../../api/requests/artists.api';
import { Container } from '../../../ui-kit/Container';
import { Spacer } from '../../../ui-kit/Spacer';
import { Typography } from '../../../ui-kit/Typography';
import { FollowedArtistCard } from './FollowedArtistCard';

export const FollowedArtistsScreen = () => {
  const { data: followedArtists } = useFollowedArtistsQuery();

  return (
    <Container expand centered={false}>
      <Typography variant="titleLarge">Followed artists</Typography>
      <Spacer size={40} />
      <FlatList
        removeClippedSubviews
        ItemSeparatorComponent={() => <Spacer size={10} />}
        data={followedArtists}
        renderItem={({ item }: ListRenderItemInfo<Artist>) => (
          <FollowedArtistCard artist={item} />
        )}
      />
    </Container>
  );
};
