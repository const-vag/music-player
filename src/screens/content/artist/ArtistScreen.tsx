import React from 'react';
import { Dimensions, Image, SectionList } from 'react-native';
import { ActivityIndicator, Button, useTheme } from 'react-native-paper';
import { Album } from '../../../api/requests/albums.api';
import { Box } from '../../../ui-kit/Box/Box';
import { Container } from '../../../ui-kit/Container';
import { Spacer } from '../../../ui-kit/Spacer';
import { Typography } from '../../../ui-kit/Typography';
import { uiVariables } from '../../../ui-kit/variables';
import { AlbumCard } from './components/AlbumCard';
import { useArtistScreen } from './useArtistScreen';
import {
  useFollowMutation,
  useUnfollowMutation,
} from '../../../api/hooks/artists.query';
import { useContentNavigators } from '../useContentNavigators';

export const Artist = () => {
  const theme = useTheme();

  const { artistQuery, separateAlbumsAndSingles } = useArtistScreen();
  const { goToAlbum } = useContentNavigators();

  const followMutation = useFollowMutation();
  const unfollowMutation = useUnfollowMutation();

  if (artistQuery.isLoading || !artistQuery.isSuccess)
    return (
      <Container>
        <ActivityIndicator animating />
      </Container>
    );

  const artist = artistQuery.data;
  const separatedData = separateAlbumsAndSingles(artist.albums);

  return (
    <Container topAwareSpacer={false} centered={false} ph={0}>
      <SectionList
        sections={separatedData}
        renderSectionHeader={({ section: { title } }) => (
          <Typography
            style={{
              paddingHorizontal: uiVariables.spacer.horizontalPadding,
              marginVertical: 15,
            }}
            variant="titleLarge"
          >
            {title}
          </Typography>
        )}
        ListHeaderComponent={
          <Box style={{ alignItems: 'flex-start' }}>
            <Box>
              <Image
                style={{
                  width: Dimensions.get('screen').width,
                  height: 350,
                }}
                source={{
                  uri: artist.image,
                }}
              />
              <Typography
                variant="displayMedium"
                style={{
                  left: uiVariables.spacer.horizontalPadding,
                  fontWeight: 'bold',
                  bottom: 0,
                  position: 'absolute',
                }}
              >
                {artist.name}
              </Typography>
            </Box>
            <Box
              style={{ justifyContent: 'space-between', width: '100%' }}
              direction="row"
              p={uiVariables.spacer.horizontalPadding}
            >
              <Button
                textColor={theme.colors.onBackground}
                uppercase
                mode="outlined"
                icon="play"
              >
                Play
              </Button>
              <Button
                onPress={
                  artist.followed
                    ? () => unfollowMutation.mutate(artist.id)
                    : () => followMutation.mutate(artist.id)
                }
                textColor={theme.colors.onBackground}
                uppercase
                mode="outlined"
                icon={
                  artist.followed
                    ? 'minus-circle-outline'
                    : 'plus-circle-outline'
                }
              >
                {artist.followed ? 'Unfollow' : 'Follow'}
              </Button>
            </Box>
          </Box>
        }
        ItemSeparatorComponent={() => <Spacer size={10} />}
        renderItem={({ item }) => (
          <AlbumCard onPress={() => goToAlbum(item.id)} album={item} />
        )}
        keyExtractor={keyExtractor}
        removeClippedSubviews
      />
    </Container>
  );
};

const keyExtractor = (album: Album) => `${album.id}`;
