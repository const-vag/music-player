import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Avatar, IconButton, Menu } from 'react-native-paper';
import { AUTH_TOKEN_KEY } from '../../shared/hooks/useAuthToken';
import { Container } from '../../ui-kit/Container';
import { ASYNC_STORAGE_SONG_KEY } from '../../shared/stores/player/usePlayerControls';
import { asyncStorage } from '../../shared/utils/asyncStorage';
import { useUserQuery } from '../../api/hooks/user.query';
import { Box } from '../../ui-kit/Box/Box';
import { TouchableOpacity } from 'react-native';
import { Typography } from '../../ui-kit/Typography';
import { User } from '../../api/requests/user.api';
import { LoadingScreen } from '../../ui-kit/LoadingScreen';

export const More = () => {
  const { data: user, isLoading, isSuccess } = useUserQuery();

  if (!isSuccess || isLoading) return <LoadingScreen />;

  return (
    <Container expand centered={false}>
      <Box direction="row" style={{ justifyContent: 'space-between' }}>
        <UserSection user={user} />
        <AddToProfileSection />
      </Box>
    </Container>
  );
};

type UserSectionProps = {
  user: User;
};
const UserSection = ({ user }: UserSectionProps) => {
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();
  const { remove } = asyncStorage();

  return (
    <Box direction="row" style={{ alignSelf: 'flex-start', columnGap: 10 }}>
      <Menu
        anchorPosition="bottom"
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Avatar.Text
              size={40}
              label={user.username[0].toUpperCase() || ''}
            />
          </TouchableOpacity>
        }
      >
        <Menu.Item
          title="Logout"
          leadingIcon="logout"
          onPress={async () => {
            await remove(ASYNC_STORAGE_SONG_KEY);
            await remove(AUTH_TOKEN_KEY);
            queryClient.resetQueries({ queryKey: [AUTH_TOKEN_KEY] });
          }}
        />
      </Menu>
      <Typography style={{ textTransform: 'capitalize' }} variant="titleMedium">
        {user.username}
      </Typography>
    </Box>
  );
};

const AddToProfileSection = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Menu
      anchorPosition="bottom"
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<IconButton icon="plus" onPress={() => setVisible(true)} />}
    >
      <Menu.Item
        title="Add playlist"
        leadingIcon="playlist-plus"
        onPress={() => {
          console.log('playlist created');
        }}
      />
      <Menu.Item
        title="Add auto playlist"
        leadingIcon="playlist-star"
        onPress={() => {
          console.log('auto playlist created');
        }}
      />
    </Menu>
  );
};
