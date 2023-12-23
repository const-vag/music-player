import React from 'react';
import { usePlaylistsQuery } from '../../../../api/hooks/playlists.query';
import { Box } from '../../../../ui-kit/Box/Box';
import { LoadingScreen } from '../../../../ui-kit/LoadingScreen';
import { Typography } from '../../../../ui-kit/Typography';
import { LikedSongsCard } from './LikedSongsCard';
import { PlaylistCard } from './PlaylistCard';

export const PlaylistsSection = () => {
  const { data: playlists, isLoading, isSuccess } = usePlaylistsQuery();
  if (isLoading || !isSuccess) return <LoadingScreen />;

  return (
    <Box style={{ rowGap: 10 }} centered={false}>
      <Typography variant="titleMedium">My Library</Typography>
      <Box centered={false}>
        <LikedSongsCard />
        {playlists.map((playlist) => (
          <PlaylistCard playlist={playlist} key={playlist.id} />
        ))}
      </Box>
    </Box>
  );
};
