import React from 'react';
import { Container } from '../../../ui-kit/Container';
import { Typography } from '../../../ui-kit/Typography';
import { useAlbum } from './useAlbum';
import { ActivityIndicator } from 'react-native-paper';
import {
  Image,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from 'react-native';
import { Box } from '../../../ui-kit/Box/Box';
import { Song } from '../../../api/requests/songs.api';
import { SongCard } from './components/SongCard';

const IMAGE_SIZE = 200;

export const Album = () => {
  const albumQuery = useAlbum();

  if (albumQuery.isLoading || !albumQuery.isSuccess)
    return (
      <Container>
        <ActivityIndicator animating />
      </Container>
    );

  const album = albumQuery.data;

  return (
    <Container>
      <Image
        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
        source={{ uri: album.image }}
      />
      <Typography>{album.name}</Typography>
      <FlatList data={album.songs} renderItem={renderItem} />
    </Container>
  );
};

const renderItem = ({ item }: ListRenderItemInfo<Song>) => (
  <SongCard song={item} />
);
