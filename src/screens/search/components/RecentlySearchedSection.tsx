import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { IconButton, Surface } from 'react-native-paper';
import { ContentRequiredInfo } from '../../../api/requests/search.api';
import { SongWithAlbumImage } from '../../../api/requests/songs.api';
import { Box } from '../../../ui-kit/Box/Box';
import { Typography } from '../../../ui-kit/Typography';
import { useContentNavigators } from '../../content/useContentNavigators';
import { usePlayerControls } from '../../../shared/stores/player/usePlayerControls';

type FavouriteSongsSectionProps = {
  songs: SongWithAlbumImage[] | undefined;
  albums: ContentRequiredInfo[] | undefined;
  artists: ContentRequiredInfo[] | undefined;
};

const IMAGE_SIZE = 50;

export const RecentlySearchedSection = ({
  songs,
  albums,
  artists,
}: FavouriteSongsSectionProps) => {
  return (
    <Box style={{ rowGap: 10 }} centered={false}>
      <Typography variant="titleMedium">Recent Searches</Typography>
      <SongsSection songs={songs} />
      <AlbumsSection albums={albums} />
      <ArtistSection artists={artists} />
    </Box>
  );
};

type SongsSectionProps = {
  songs: SongWithAlbumImage[] | undefined;
};

const SongsSection = ({ songs }: SongsSectionProps) => {
  const { updateAndPlaySong } = usePlayerControls();

  if (!songs?.length) return null;

  return (
    <Box centered={false}>
      <Typography variant="titleSmall">Songs</Typography>
      <Box centered={false} style={{ flexWrap: 'wrap' }} direction="row">
        {songs?.map((song) => (
          <Box p={5} style={{ width: '50%' }} key={song.id}>
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => updateAndPlaySong(song)}
            >
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
                  <Image
                    style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                    source={{ uri: song.albumImage }}
                  />
                  <Typography truncate>{song.name}</Typography>
                  <IconButton size={15} icon="play" />
                </Box>
              </Surface>
            </TouchableOpacity>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

type AlbumsSectionProps = {
  albums: ContentRequiredInfo[] | undefined;
};
const AlbumsSection = ({ albums }: AlbumsSectionProps) => {
  const { goToAlbum } = useContentNavigators();

  if (!albums?.length) return null;

  return (
    <Box centered={false}>
      <Typography variant="titleSmall">Albums</Typography>
      <Box centered={false} style={{ flexWrap: 'wrap' }} direction="row">
        {albums?.map((album) => (
          <Box p={5} style={{ width: '50%' }} key={album.id}>
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => goToAlbum(album.id)}
            >
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
                  <Image
                    style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                    source={{ uri: album.image }}
                  />
                  <Typography truncate>{album.name}</Typography>
                </Box>
              </Surface>
            </TouchableOpacity>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

type ArtistsSectionProps = {
  artists: ContentRequiredInfo[] | undefined;
};
const ArtistSection = ({ artists }: ArtistsSectionProps) => {
  const { goToArtist } = useContentNavigators();

  if (!artists?.length) return null;

  return (
    <Box centered={false}>
      <Typography variant="titleSmall">Artists</Typography>
      <Box centered={false} style={{ flexWrap: 'wrap' }} direction="row">
        {artists?.map((artist) => (
          <Box p={5} style={{ width: '50%' }} key={artist.id}>
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => goToArtist(artist.id)}
            >
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
                  <Image
                    style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                    source={{ uri: artist.image }}
                  />
                  <Typography truncate>{artist.name}</Typography>
                </Box>
              </Surface>
            </TouchableOpacity>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
