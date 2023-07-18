import React from 'react';
import { ImageBackground, SectionList, View } from 'react-native';
import { ActivityIndicator, Button, useTheme } from 'react-native-paper';
import { Album } from '../../../api/requests/albums.api';
import { Box } from '../../../ui-kit/Box/Box';
import { Container } from '../../../ui-kit/Container';
import { Spacer } from '../../../ui-kit/Spacer';
import { Typography } from '../../../ui-kit/Typography';
import { uiVariables } from '../../../ui-kit/variables';
import { AlbumCard } from './components/AlbumCard';
import { useArtist } from './useArtist';

export const Artist = () => {
  const { artistQuery, separateAlbumsAndSingles, goToAlbum } = useArtist();
  const theme = useTheme();

  if (artistQuery.isLoading || !artistQuery.isSuccess)
    return (
      <Container>
        <ActivityIndicator animating />
      </Container>
    );

  const artist = artistQuery.data;
  const separatedData = separateAlbumsAndSingles(artist.albums);

  return (
    <Container ph={0}>
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
          <Box expand>
            <ImageBackground
              style={{
                flex: 1,
                width: '100%',
                height: 350,
              }}
              source={{
                uri: artist.image,
              }}
            >
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} />
            </ImageBackground>
            <Box
              ph={uiVariables.spacer.horizontalPadding}
              direction="row"
              style={{
                justifyContent: 'space-between',
                backgroundColor: 'transparent',
                width: '100%',
                position: 'absolute',
                bottom: 0,
              }}
            >
              <Typography
                variant="displayMedium"
                style={{
                  fontWeight: 'bold',
                }}
              >
                {artist.name}
              </Typography>
              <Button
                textColor={theme.colors.onBackground}
                uppercase
                mode="outlined"
                icon="plus-circle-outline"
              >
                Follow
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
