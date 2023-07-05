import React from "react";
import { Container } from "../../../ui-kit/Container";
import { Typography } from "../../../ui-kit/Typography";
import { useArtist } from "./useArtist";

export const Artist = () => {
  const { artist, isLoading } = useArtist();
  console.log("🚀 ~ file: Artist.tsx:8 ~ Artist ~ artist:", artist)

  return (
    <Container>
      <Typography>Artist</Typography>
    </Container>
  );
};
