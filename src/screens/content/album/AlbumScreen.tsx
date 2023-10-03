import React from 'react';
import { FlatList, Image, ListRenderItemInfo } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Song } from '../../../api/requests/songs.api';
import { Container } from '../../../ui-kit/Container';
import { Typography } from '../../../ui-kit/Typography';
import { SongCard } from './components/SongCard';
import { useAlbumScreen } from './useAlbumScreen';
import { Spacer } from '../../../ui-kit/Spacer';
import { Box } from '../../../ui-kit/Box/Box';

const IMAGE_SIZE = 200;

export const Album = () => {
  const albumQuery = useAlbumScreen();

  if (albumQuery.isLoading || !albumQuery.isSuccess)
    return (
      <Container>
        <ActivityIndicator animating />
      </Container>
    );

  const album = albumQuery.data;

  return (
    <Container topAwareSpacer={false}>
      <Box>
        <Image
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
          source={{ uri: album.image }}
        />
        <Typography variant="titleLarge">{album.name}</Typography>
        <Spacer />
      </Box>
      <FlatList
        removeClippedSubviews
        ItemSeparatorComponent={() => <Spacer size={10} />}
        data={album.songs}
        keyExtractor={keyExtractor}
        renderItem={({ item }: ListRenderItemInfo<Song>) => (
          <SongCard song={item} albumImage={album.image} />
        )}
      />
    </Container>
  );
};

const keyExtractor = (song: Song) => `${song.id}`;
