import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useRecentlySearched } from '../../shared/hooks/useRecentlySearched';
import { Container } from '../../ui-kit/Container';
import { Spacer } from '../../ui-kit/Spacer';
import { RecentlySearchedSection } from './components/RecentlySearchedSection';
import { useHomeScreen } from './useHomeScreen';
import { useUserQuery } from '../../api/hooks/user.query';
import { LoadingScreen } from '../../ui-kit/LoadingScreen';
import { useRadioPlaylistsQuery } from '../../api/hooks/playlists.query';
import { RadioPlaylistsSection } from './components/RadioPlaylistsSection';

export const HomeScreen = () => {
  const { goToSearchPage } = useHomeScreen();
  const { isLoading: isUserLoading } = useUserQuery();
  const {
    artists: recentlySearchedArtists,
    songs: recentlySearchedSongs,
    albums: recentlySearchedAlbums,
  } = useRecentlySearched();
  const { isLoading: isRadioPlaylistsLoading } = useRadioPlaylistsQuery();

  if (isUserLoading || isRadioPlaylistsLoading) return <LoadingScreen />;

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
        <RadioPlaylistsSection />
        <Spacer size={100} />
      </ScrollView>
    </Container>
  );
};
