import React, { memo, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Button, Dialog, IconButton, Menu, Portal } from 'react-native-paper';
import { usePlaylistsQuery } from '../../../../api/hooks/playlists.query';
import {
  useAddSongToPlaylistMutation,
  useLikeSongMutation,
  useUnlikeSongMutation,
} from '../../../../api/hooks/songs.query';
import { Playlist } from '../../../../api/requests/playlists.api';
import { Song } from '../../../../api/requests/songs.api';
import { usePlayerControls } from '../../../../shared/stores/player/usePlayerControls';
import { useSnackbarControls } from '../../../../shared/stores/snackbar/useSnackbarControls';
import { Box } from '../../../../ui-kit/Box/Box';
import { MaterialIcon } from '../../../../ui-kit/MaterialIcon';
import { Typography } from '../../../../ui-kit/Typography';

type SongCardProps = {
  song: Song;
  albumImage: string;
};

const SongCardComponent = ({ song, albumImage }: SongCardProps) => {
  const { updateAndPlaySong } = usePlayerControls();
  const { show } = useSnackbarControls();

  const [menuShown, setMenuShown] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);

  const unlikeSongMutation = useUnlikeSongMutation();
  const likeSongMutation = useLikeSongMutation();

  return (
    <TouchableOpacity
      onPress={
        song.link
          ? () => updateAndPlaySong({ ...song, albumImage })
          : () => show("Song can't play right now, try again later.")
      }
    >
      <Box centered={false} expand>
        <Box
          style={{
            justifyContent: 'space-between',
          }}
          direction="row"
        >
          <Box style={{ alignItems: 'flex-start' }}>
            <Typography variant="titleMedium">{song.name}</Typography>
            <Typography variant="bodySmall">
              {song.artists.map((artist) => artist.name).join(', ')}
            </Typography>
          </Box>
          <Box direction="row">
            <IconButton
              icon={song.liked ? 'heart' : 'heart-outline'}
              onPress={
                song.liked
                  ? () => unlikeSongMutation.mutate(song.id)
                  : () => likeSongMutation.mutate(song.id)
              }
            />
            <Menu
              anchorPosition="bottom"
              visible={menuShown}
              onDismiss={() => setMenuShown(false)}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  onPress={() => setMenuShown(true)}
                />
              }
            >
              <Menu.Item
                title="Add to playlist"
                leadingIcon="playlist-plus"
                onPress={() => {
                  setDialogShown(true);
                  setMenuShown(false);
                }}
              />
            </Menu>
          </Box>
        </Box>
      </Box>
      <PlaylistsDialog
        songId={song.id}
        visible={dialogShown}
        onHideDialog={() => setDialogShown(false)}
      />
    </TouchableOpacity>
  );
};

export const SongCard = memo(SongCardComponent);

type PlaylistsDialogProps = {
  visible: boolean;
  onHideDialog: () => void;
  songId: number;
};
const PlaylistsDialog = ({
  onHideDialog,
  visible,
  songId,
}: PlaylistsDialogProps) => {
  const { data: playlists } = usePlaylistsQuery();
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>();
  const addSongToPlaylistMutation = useAddSongToPlaylistMutation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onHideDialog}>
        <Dialog.Title>
          <Typography>Select a playlist</Typography>
        </Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView style={{ maxHeight: 300 }}>
            {playlists?.map((playlist) => (
              <PlaylistCard
                isSelected={selectedPlaylist?.id === playlist.id}
                playlist={playlist}
                onSelectPlaylist={() => setSelectedPlaylist(playlist)}
                key={playlist.id}
              />
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onHideDialog}>Cancel</Button>
          <Button
            onPress={async () => {
              if (selectedPlaylist) {
                await addSongToPlaylistMutation.mutateAsync({
                  songId,
                  playlistId: selectedPlaylist?.id,
                });
                onHideDialog();
              }
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

type PlaylistCardProps = {
  playlist: Playlist;
  onSelectPlaylist: () => void;
  isSelected: boolean;
};
const PlaylistCard = ({
  playlist,
  onSelectPlaylist,
  isSelected,
}: PlaylistCardProps) => {
  return (
    <TouchableOpacity onPress={onSelectPlaylist}>
      <Box
        p={15}
        transparent
        direction="row"
        style={{ justifyContent: 'space-between' }}
        centered={false}
      >
        <Typography variant="titleMedium">{playlist.name}</Typography>
        {isSelected && <MaterialIcon size={25} name="check-circle" />}
      </Box>
    </TouchableOpacity>
  );
};
