import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useFollowedArtistsQuery } from '../../api/hooks/user.query';
import { useRecentlySearched } from '../../shared/hooks/useRecentlySearched';
import { Container } from '../../ui-kit/Container';
import { Spacer } from '../../ui-kit/Spacer';
import { FollowedArtistsSection } from './components/FollowedArtistsSection';
import { useHomeScreen } from './useHomeScreen';
import { RecentlySearchedSection } from './components/RecentlySearchedSection';

export const HomeScreen = () => {
  const { goToSearchPage } = useHomeScreen();
  const { data: followedArtists } = useFollowedArtistsQuery();
  const {
    artists: recentlySearchedArtists,
    songs: recentlySearchedSongs,
    albums: recentlySearchedAlbums,
  } = useRecentlySearched();

  return (
    <Container expand centered={false}>
      <ScrollView>
        <Button
          contentStyle={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}
          style={{ borderRadius: 5 }}
          mode="contained"
          icon="magnify"
          onPress={goToSearchPage}
        >
          Search
        </Button>
        <Spacer size={30} />
        <RecentlySearchedSection
          albums={recentlySearchedAlbums}
          artists={recentlySearchedArtists}
          songs={recentlySearchedSongs}
        />
        <Spacer size={30} />
        <FollowedArtistsSection followedArtists={followedArtists} />
      </ScrollView>
    </Container>
  );
};
