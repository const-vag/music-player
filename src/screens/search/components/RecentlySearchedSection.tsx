import React from 'react';
import { ContentRequiredInfo } from '../../../api/requests/search.api';
import { SongWithAlbumImage } from '../../../api/requests/songs.api';
import { usePlayerControls } from '../../../shared/stores/player/usePlayerControls';
import { Box } from '../../../ui-kit/Box/Box';
import { Typography } from '../../../ui-kit/Typography';
import { useContentNavigators } from '../../content/useContentNavigators';
import { RecentlySearchedContentCard } from './RecentlySearchedContentCard';

type FavoriteSongsSectionProps = {
  songs: SongWithAlbumImage[] | undefined;
  albums: ContentRequiredInfo[] | undefined;
  artists: ContentRequiredInfo[] | undefined;
};

export const RecentlySearchedSection = ({
  songs,
  albums,
  artists,
}: FavoriteSongsSectionProps) => {
  const hasRecentlySearched = Boolean(
    songs?.length || albums?.length || artists?.length
  );

  if (!hasRecentlySearched) return null;

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
          <RecentlySearchedContentCard
            imageSrc={song.albumImage}
            name={song.name}
            onPress={() => updateAndPlaySong(song)}
            key={song.id}
          />
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
          <RecentlySearchedContentCard
            imageSrc={album.image}
            name={album.name}
            onPress={() => goToAlbum(album.id)}
            key={album.id}
          />
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
          <RecentlySearchedContentCard
            imageSrc={artist.image}
            name={artist.name}
            onPress={() => goToArtist(artist.id)}
            key={artist.id}
          />
        ))}
      </Box>
    </Box>
  );
};
