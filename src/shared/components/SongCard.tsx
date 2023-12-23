import React, { memo, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Button, Dialog, IconButton, Menu, Portal } from 'react-native-paper';
import { SongWithAlbumImage } from '../../api/requests/songs.api';
import { usePlayerControls } from '../stores/player/usePlayerControls';
import { useSnackbarControls } from '../stores/snackbar/useSnackbarControls';
import {
  useAddSongToPlaylistMutation,
  useLikeSongMutation,
  useRemoveSongFromPlaylistMutation,
  useUnlikeSongMutation,
} from '../../api/hooks/songs.query';
import { Box } from '../../ui-kit/Box/Box';
import { Typography } from '../../ui-kit/Typography';
import { usePlaylistsQuery } from '../../api/hooks/playlists.query';
import { Playlist } from '../../api/requests/playlists.api';
import { MaterialIcon } from '../../ui-kit/MaterialIcon';
import { useIsMutating } from '@tanstack/react-query';

type SongCardProps = {
  song: SongWithAlbumImage;
  playlistId: number | undefined;
};

const SongCardComponent = ({ song, playlistId }: SongCardProps) => {
  const { updateAndPlaySong } = usePlayerControls();
  const { show } = useSnackbarControls();

  const [menuShown, setMenuShown] = useState(false);
  const [playlistsDialogShown, setPlaylistsDialogShown] = useState(false);
  const [deleteDialogShown, setDeleteDialogShown] = useState(false);

  const unlikeSongMutation = useUnlikeSongMutation();
  const likeSongMutation = useLikeSongMutation();
  const removeSongFromPlaylistMutation = useRemoveSongFromPlaylistMutation();

  const isMutating = useIsMutating() > 0;

  return (
    <TouchableOpacity
      onPress={
        song.link
          ? () => updateAndPlaySong(song)
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
          <Box style={{ alignItems: 'flex-start', flex: 1 }}>
            <Typography truncate variant="titleMedium">
              {song.name}
            </Typography>
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
                  setPlaylistsDialogShown(true);
                  setMenuShown(false);
                }}
              />
              {playlistId && (
                <Menu.Item
                  title="Remove from playlist"
                  leadingIcon="playlist-remove"
                  onPress={() => {
                    setDeleteDialogShown(true);
                    setMenuShown(false);
                  }}
                />
              )}
            </Menu>
          </Box>
        </Box>
      </Box>
      <PlaylistsDialog
        songId={song.id}
        visible={playlistsDialogShown}
        onHideDialog={() => setPlaylistsDialogShown(false)}
      />
      {playlistId && (
        <ConfirmDeletionDialog
          onSubmit={async () =>
            removeSongFromPlaylistMutation.mutate(
              {
                songId: song.id,
                playlistId: playlistId,
              },
              {
                onSuccess: () => setDeleteDialogShown(false),
              }
            )
          }
          visible={deleteDialogShown}
          loading={isMutating}
          onHideDialog={() => setDeleteDialogShown(false)}
        />
      )}
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

  const isMutating = useIsMutating() > 0;

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
            loading={isMutating}
            onPress={async () => {
              if (selectedPlaylist) {
                await addSongToPlaylistMutation.mutateAsync(
                  {
                    songId,
                    playlistId: selectedPlaylist?.id,
                  },
                  { onSuccess: () => onHideDialog() }
                );
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

type ConfirmDeletionDialogProps = {
  visible: boolean;
  loading: boolean;
  onHideDialog: () => void;
  onSubmit: () => Promise<unknown>;
};

const ConfirmDeletionDialog = ({
  loading,
  onHideDialog,
  onSubmit,
  visible,
}: ConfirmDeletionDialogProps) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onHideDialog}>
        <Dialog.Title>
          <Typography>
            Are you sure you want to remove this song from playlist?
          </Typography>
        </Dialog.Title>
        <Dialog.Actions>
          <Button onPress={onHideDialog}>No</Button>
          <Button loading={loading} onPress={onSubmit}>
            {`Yes I'm sure`}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
