import React, { useCallback } from 'react';
import { useFavouriteSongsQuery } from '../../api/hooks/user.query';
import { LoadingScreen } from '../../ui-kit/LoadingScreen';
import { useFocusEffect } from '@react-navigation/native';
import { useMiniPlayerControls } from '../../shared/stores/player/MiniPlayerStore';
import PlaylistView from '../../shared/components/PlaylistView';

export const FavoriteSongsScreen = () => {
  const {
    data: favoriteSongs,
    isLoading,
    isSuccess,
  } = useFavouriteSongsQuery();
  const { minimize, maximize } = useMiniPlayerControls();

  useFocusEffect(
    useCallback(() => {
      minimize();
      return () => maximize();
    }, [maximize, minimize])
  );

  if (isLoading || !isSuccess) return <LoadingScreen />;

  return <PlaylistView name="Favorite songs" songs={favoriteSongs} />;
};
