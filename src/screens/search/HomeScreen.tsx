import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useUserQuery } from '../../api/hooks/user.query';
import { useRecentlySearched } from '../../shared/hooks/useRecentlySearched';
import { Container } from '../../ui-kit/Container';
import { LoadingScreen } from '../../ui-kit/LoadingScreen';
import { Spacer } from '../../ui-kit/Spacer';
import { FollowedArtistsSection } from './components/FollowedArtistsSection';
import { useHomeScreen } from './useHomeScreen';

export const HomeScreen = () => {
  const { goToSearchPage } = useHomeScreen();
  const { data: user, isSuccess, isLoading } = useUserQuery();
  const { artists } = useRecentlySearched();

  if (!isSuccess || isLoading) return <LoadingScreen />;

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
        <FollowedArtistsSection followedArtists={user.followedArtists} />
        <Spacer size={30} />
        <Button
          onPress={() => {
            console.log(artists);
          }}
        >
          Check
        </Button>
        {/* <FavouriteSongsSection favouriteSongs={user.favoriteSongs} /> */}
      </ScrollView>
    </Container>
  );
};
