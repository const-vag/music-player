import React from 'react';
import { SongWithAlbumImage } from '../../api/requests/songs.api';
import { Container } from '../../ui-kit/Container';
import { Typography } from '../../ui-kit/Typography';
import { usePlayerControls } from '../stores/player/usePlayerControls';
import { useSnackbarControls } from '../stores/snackbar/useSnackbarControls';
import { Dimensions, FlatList, Image, ListRenderItemInfo } from 'react-native';
import { Box } from '../../ui-kit/Box/Box';
import { uiVariables } from '../../ui-kit/variables';
import { Spacer } from '../../ui-kit/Spacer';
import { Button, useTheme } from 'react-native-paper';
import { SongCard } from './SongCard';

type PlaylistViewProps = {
  name: string;
  songs: SongWithAlbumImage[];
  playlistId?: number;
};
export const PlaylistView = ({
  name,
  songs,
  playlistId,
}: PlaylistViewProps) => {
  const theme = useTheme();

  const { updateAndPlaySong } = usePlayerControls();
  const { show } = useSnackbarControls();

  const handlePlayFirstSong = () => {
    const firstSong = songs[0];
    if (firstSong) {
      updateAndPlaySong(firstSong);
    } else {
      show("Song can't play right now, try again later.");
    }
  };

  if (!songs?.length)
    return (
      <Container>
        <Typography>This list is empty</Typography>
      </Container>
    );

  return (
    <Container topAwareSpacer={false} ph={0}>
      <FlatList
        ListHeaderComponent={
          <Box style={{ alignItems: 'flex-start' }}>
            <Box>
              <Image
                style={{
                  width: Dimensions.get('screen').width,
                  height: 200,
                  opacity: 0.5,
                }}
                source={{
                  uri: songs[0].albumImage,
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
                {name}
              </Typography>
            </Box>
            <Spacer />
            <Button
              style={{ marginLeft: uiVariables.spacer.horizontalPadding }}
              textColor={theme.colors.onBackground}
              uppercase
              mode="outlined"
              icon="play"
              onPress={handlePlayFirstSong}
            >
              Play
            </Button>
            <Spacer />
          </Box>
        }
        removeClippedSubviews
        ItemSeparatorComponent={() => <Spacer size={10} />}
        ListFooterComponent={() => <Spacer />}
        data={songs}
        renderItem={({ item }: ListRenderItemInfo<SongWithAlbumImage>) => (
          <Box ph={uiVariables.spacer.horizontalPadding}>
            <SongCard playlistId={playlistId} song={item} />
          </Box>
        )}
      />
    </Container>
  );
};
