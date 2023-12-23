import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Playlist } from '../../../../api/requests/playlists.api';
import { Box } from '../../../../ui-kit/Box/Box';
import { MaterialIcon } from '../../../../ui-kit/MaterialIcon';
import { Typography } from '../../../../ui-kit/Typography';
import { usePlaylistNavigators } from '../../../playlist/usePlaylistNavigator';
import {
  Button,
  Dialog,
  IconButton,
  Menu,
  Portal,
  TextInput,
} from 'react-native-paper';
import {
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} from '../../../../api/hooks/playlists.query';
import { useIsMutating } from '@tanstack/react-query';

type PlaylistCardProps = {
  playlist: Playlist;
};

const IMAGE_SIZE = 35;

export const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const { goToPlaylist } = usePlaylistNavigators();

  const updatePlaylistMutation = useUpdatePlaylistMutation();
  const deletePlaylistMutation = useDeletePlaylistMutation();

  const isMutating = useIsMutating() > 0;

  const [menuShown, setMenuShown] = useState(false);
  const [renameDialogShown, setRenameDialogShown] = useState(false);
  const [deleteDialogShown, setDeleteDialogShown] = useState(false);

  return (
    <TouchableOpacity onPress={() => goToPlaylist(playlist.id)}>
      <Box
        pv={10}
        direction="row"
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          direction="row"
          style={{
            columnGap: 10,
          }}
        >
          <MaterialIcon size={IMAGE_SIZE} name="music-box-outline" />
          <Typography variant="bodyLarge">{playlist.name}</Typography>
        </Box>
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
            title="Rename playlist"
            leadingIcon="playlist-edit"
            onPress={() => {
              setRenameDialogShown(true);
              setMenuShown(false);
            }}
          />
          <Menu.Item
            title="Delete"
            leadingIcon="trash-can-outline"
            onPress={() => {
              setDeleteDialogShown(true);
              setMenuShown(false);
            }}
          />
        </Menu>
      </Box>
      <RenameDialog
        onSubmit={async (text) =>
          await updatePlaylistMutation.mutateAsync(
            {
              id: playlist.id,
              playlistName: text,
            },
            { onSuccess: () => setRenameDialogShown(false) }
          )
        }
        onHideDialog={() => setRenameDialogShown(false)}
        loading={isMutating}
        visible={renameDialogShown}
      />
      <ConfirmDeletionDialog
        loading={isMutating}
        onHideDialog={() => setDeleteDialogShown(false)}
        visible={deleteDialogShown}
        onSubmit={async () =>
          await deletePlaylistMutation.mutateAsync(playlist.id, {
            onSuccess: () => setDeleteDialogShown(false),
          })
        }
      />
    </TouchableOpacity>
  );
};

type RenameDialogProps = {
  visible: boolean;
  loading: boolean;
  onHideDialog: () => void;
  onSubmit: (text: string) => Promise<unknown>;
};
const RenameDialog = ({
  onHideDialog,
  onSubmit,
  visible,
  loading,
}: RenameDialogProps) => {
  const [name, setName] = useState('');

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onHideDialog}>
        <Dialog.Title>
          <Typography>Rename playlist</Typography>
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            onChangeText={(i) => setName(i)}
            style={{ width: '100%' }}
            autoFocus
            mode="outlined"
            label="Name"
            placeholder="Enter a name for your playlist"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onHideDialog}>Cancel</Button>
          <Button
            loading={loading}
            onPress={async () => {
              if (name.length >= 2) {
                await onSubmit(name);
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
            Are you sure you want to delete this playlist?
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
