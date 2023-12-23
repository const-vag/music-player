import React from 'react';
import { Container } from '../../ui-kit/Container';
import { Box } from '../../ui-kit/Box/Box';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList, MainStackRoutes } from '../../navigator/types';
import { usePlaylistQuery } from '../../api/hooks/playlists.query';
import { LoadingScreen } from '../../ui-kit/LoadingScreen';
import { FlatList, Image, ListRenderItemInfo } from 'react-native';
import { Typography } from '../../ui-kit/Typography';
import { Spacer } from '../../ui-kit/Spacer';
import { SongWithAlbumImage } from '../../api/requests/songs.api';
import { SongCard } from '../../shared/components/SongCard';

type PlaylistRouteProp = RouteProp<
  MainStackParamList,
  MainStackRoutes.PLAYLIST
>;

const IMAGE_SIZE = 200;

export const PlaylistScreen = () => {
  const {
    params: { id },
  } = useRoute<PlaylistRouteProp>();
  console.log('🚀 ~ file: PlaylistScreen.tsx:24 ~ PlaylistScreen ~ id:', id);

  const { data: playlist, isLoading, isSuccess } = usePlaylistQuery(id);
  console.log(
    '🚀 ~ file: PlaylistScreen.tsx:28 ~ PlaylistScreen ~ playlist:',
    playlist?.songs?.length
  );

  if (isLoading || !isSuccess) return <LoadingScreen />;

  if (!playlist.songs?.length)
    return (
      <Container>
        <Typography>This playlist is empty</Typography>
      </Container>
    );

  return (
    <Container topAwareSpacer={false}>
      <Box>
        <Image
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
          source={{ uri: playlist.songs[0].albumImage }}
        />
        <Typography variant="titleLarge">{playlist.name}</Typography>
        <Spacer />
      </Box>
      <FlatList
        removeClippedSubviews
        ItemSeparatorComponent={() => <Spacer size={10} />}
        ListFooterComponent={() => <Spacer />}
        data={playlist.songs}
        renderItem={({ item }: ListRenderItemInfo<SongWithAlbumImage>) => (
          <SongCard song={item} />
        )}
      />
    </Container>
  );
};
