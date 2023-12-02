import React from 'react';
import { SectionList } from 'react-native';
import { TextInput } from 'react-native-paper';
import { isSongWithAlbumImage } from '../../../api/requests/songs.api';
import { Container } from '../../../ui-kit/Container';
import { Typography } from '../../../ui-kit/Typography';
import { useContentNavigators } from '../../content/useContentNavigators';
import { SearchContentResult } from '../components/SearchContentResult';
import { SearchSongResult } from '../components/SearchSongResult';
import { useSearchScreen } from './useSearchScreen';
import { Spacer } from '../../../ui-kit/Spacer';

const SearchScreen = () => {
  const { delayedFn, searchResultSections } = useSearchScreen();
  const { goToAlbum, goToArtist } = useContentNavigators();

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
      <SectionList
        sections={searchResultSections}
        removeClippedSubviews
        renderSectionHeader={({ section: { title, data } }) => {
          if (!data.length) return null;
          return (
            <Typography
              style={{
                marginTop: 30,
                marginBottom: 15,
              }}
              variant="titleMedium"
            >
              {title}
            </Typography>
          );
        }}
        ItemSeparatorComponent={() => <Spacer size={10} />}
        renderItem={({ item, section: { title } }) => {
          if (isSongWithAlbumImage(item))
            return <SearchSongResult song={item} />;

          if (title === 'Artists')
            return (
              <SearchContentResult
                onPress={() => goToArtist(item.id)}
                item={item}
              />
            );

          if (title === 'Albums')
            return (
              <SearchContentResult
                onPress={() => goToAlbum(item.id)}
                item={item}
              />
            );

          return null;
        }}
      />
    </Container>
  );
};

export default SearchScreen;
