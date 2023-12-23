import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { usePlaylistQuery } from '../../api/hooks/playlists.query';
import { MainStackParamList, MainStackRoutes } from '../../navigator/types';
import { PlaylistView } from '../../shared/components/PlaylistView';
import { useMiniPlayerControls } from '../../shared/stores/player/MiniPlayerStore';
import { LoadingScreen } from '../../ui-kit/LoadingScreen';

type PlaylistRouteProp = RouteProp<
  MainStackParamList,
  MainStackRoutes.PLAYLIST
>;

export const PlaylistScreen = () => {
  const {
    params: { id },
  } = useRoute<PlaylistRouteProp>();

  const { data: playlist, isLoading, isSuccess } = usePlaylistQuery(id);

  const { minimize, maximize } = useMiniPlayerControls();

  useFocusEffect(
    useCallback(() => {
      minimize();
      return () => maximize();
    }, [maximize, minimize])
  );

  if (isLoading || !isSuccess) return <LoadingScreen />;

  return (
    <PlaylistView
      name={playlist.name}
      songs={playlist.songs}
      playlistId={playlist.id}
    />
  );
};
