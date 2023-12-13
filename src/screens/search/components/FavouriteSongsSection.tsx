import React, { useEffect } from 'react';
import { Typography } from '../../../ui-kit/Typography';
import { Box } from '../../../ui-kit/Box/Box';
import { Artist } from '../../../api/requests/artists.api';
import { Spacer } from '../../../ui-kit/Spacer';
import { Button, Surface } from 'react-native-paper';
import { Image } from 'react-native';
import { SongWithAlbumImage } from '../../../api/requests/songs.api';

type FavouriteSongsSectionProps = {
  favouriteSongs: SongWithAlbumImage[];
};

const IMAGE_SIZE = 50;

export const FavouriteSongsSection = ({
  favouriteSongs,
}: FavouriteSongsSectionProps) => {
  const firstNineFavourite = favouriteSongs.slice(0, 9);

  // useEffect(() => {
  //   firstTenFavourite.forEach((a) => console.log(a));
  // }, [firstTenFavourite]);

  return (
    <Box style={{ rowGap: 10 }} centered={false}>
      <Typography variant="titleMedium">Favourite songs</Typography>
      <Box centered={false} style={{ flexWrap: 'wrap' }} direction="row">
        {firstNineFavourite.map((song) => (
          <Box p={5} style={{ width: '50%' }} key={song.id}>
            <Surface style={{ width: '100%' }} elevation={4}>
              <Box
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  columnGap: 15,
                }}
                direction="row"
                transparent
              >
                {/* <Image
                  style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                  source={{ uri: song.image }}
                /> */}
                <Typography truncate>{song.name}</Typography>
              </Box>
            </Surface>
          </Box>
        ))}
        <Box p={5} style={{ width: '50%' }}>
          <Button
            style={{ width: '100%' }}
            onPress={() => console.log('TODO: see all followed artists')}
          >
            See all
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
