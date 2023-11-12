import React from 'react';
import { TextInput } from 'react-native-paper';
import { Container } from '../../ui-kit/Container';
import { useSearchScreen } from './useSearchScreen';

const SearchScreen = () => {
  const { delayedFn, searchResult } = useSearchScreen();
  console.log("🚀 ~ file: SearchScreen.tsx:8 ~ SearchScreen ~ searchResult:", searchResult?.songs)

  return (
    <Container expand centered={false}>
      <TextInput
        onChangeText={delayedFn}
        style={{ width: '100%' }}
        autoFocus
        right={<TextInput.Icon icon="magnify" />}
        mode="outlined"
        label="Search"
        placeholder="Type a song name, album or artist"
      />
    </Container>
  );
};

export default SearchScreen;
