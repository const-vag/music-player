import React from "react";
import { Box } from "../../../../ui-kit/Box/Box";
import { Album } from "../../../../api/requests/albums.api";
import { Image } from "react-native";
import { Typography } from "../../../../ui-kit/Typography";

type AlbumCardProps = {
  album: Album;
};

const IMAGE_SIZE = 60;

export const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <Box mv={10} direction="row">
      <Image
        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
        source={{ uri: album.image }}
      />
      <Box ml={10} style={{ alignItems: "flex-start" }}>
        <Typography variant="titleMedium">{album.name}</Typography>
        <Typography variant="bodySmall">
          {new Date(album.releaseDate).getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};
