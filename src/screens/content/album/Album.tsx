import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Song } from '../../../api/requests/songs.api';
import { Container } from '../../../ui-kit/Container';
import { Typography } from '../../../ui-kit/Typography';
import { SongCard } from './components/SongCard';
import { useAlbum } from './useAlbum';

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
