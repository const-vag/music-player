import React from 'react';
import { Image, SectionList, SectionListRenderItemInfo } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Album } from '../../../api/requests/albums.api';
import { Box } from '../../../ui-kit/Box/Box';
import { Container } from '../../../ui-kit/Container';
import { Spacer } from '../../../ui-kit/Spacer';
import { Typography } from '../../../ui-kit/Typography';
import { uiVariables } from '../../../ui-kit/variables';
import { AlbumCard } from './components/AlbumCard';
import { useArtist } from './useArtist';

export const Artist = () => {
  const { artistQuery, seperateAlbumsAndSingles } = useArtist();

  if (artistQuery.isLoading || !artistQuery.isSuccess)
    return (
      <Container>
        <ActivityIndicator animating />
      </Container>
    );

  const artist = artistQuery.data;
  const seperatedData = seperateAlbumsAndSingles(artist.albums);

  return (
    <Container ph={0}>
      <SectionList
        sections={seperatedData}
        renderSectionHeader={({ section: { title } }) => (
          <Typography
            style={{
              paddingHorizontal: uiVariables.spacer.horizontalPadding,
              marginVertical: 15,
            }}
            variant="titleLarge"
          >
            {title}
          </Typography>
        )}
        ListHeaderComponent={
          <Box>
            <Image
              style={{
                width: 450,
                height: 350,
              }}
              source={{
                uri: artist.image,
              }}
            />
            <Typography
              variant="displayMedium"
              style={{
                position: 'absolute',
                bottom: 0,
                left: uiVariables.spacer.horizontalPadding,
                fontWeight: 'bold',
              }}
            >
              {artist.name}
            </Typography>
          </Box>
        }
        data={artist.albums}
        ItemSeparatorComponent={() => <Spacer size={10} />}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={<Spacer size={70} />}
        removeClippedSubviews
      />
    </Container>
  );
};

const renderItem = ({
  item,
}: SectionListRenderItemInfo<
  Album,
  {
    title: string;
    data: Album[];
  }
>) => <AlbumCard album={item} />;

const keyExtractor = (album: Album) => album.id;
