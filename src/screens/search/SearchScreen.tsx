import React from 'react';
import { TextInput } from 'react-native-paper';
import { Container } from '../../ui-kit/Container';

const SearchScreen = () => {
  return (
    <Container expand centered={false}>
      <TextInput
        style={{ width: '100%' }}
        autoFocus
        right={<TextInput.Icon icon="magnify" />}
        mode="outlined"
        label="Search"
        placeholder="Type a song name, album or artist"
      />
      {/* <Typography>Search screen</Typography> */}
    </Container>
  );
};

export default SearchScreen;
