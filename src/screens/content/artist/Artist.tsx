import React from "react";
import { Dimensions, Image } from "react-native";
import { Container } from "../../../ui-kit/Container";
import { Typography } from "../../../ui-kit/Typography";
import { useArtist } from "./useArtist";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { ScrollView } from "react-native";
import { Box } from "../../../ui-kit/Box/Box";
import { AlbumCard } from "./components/AlbumCard";
import { Spacer } from "../../../ui-kit/Spacer";
import { uiVariables } from "../../../ui-kit/variables";

export const Artist = () => {
  const { artistQuery, seperateAlbumsAndSingles } = useArtist();
  const dimensions = Dimensions.get("window");

  if (artistQuery.isLoading || !artistQuery.isSuccess)
    return (
      <Container>
        <ActivityIndicator animating />
      </Container>
    );

  const artist = artistQuery.data;
  const { albums, singles } = seperateAlbumsAndSingles(artist.albums);

  return (
    <Container ph={0}>
      <ScrollView>
        <Box>
          <Image
            resizeMode="cover"
            style={{
              width: dimensions.width,
              height: 350,
            }}
            source={{
              uri: artist.image,
            }}
          />
          <Typography
            variant="displayMedium"
            style={{
              position: "absolute",
              bottom: 0,
              left: uiVariables.spacer.horizontalPadding,
              fontWeight: "bold",
            }}
          >
            {artist.name}
          </Typography>
        </Box>
        <Box ph={uiVariables.spacer.horizontalPadding} style={{ alignItems: "flex-start" }}>
          {albums.length > 0 && (
            <Box mv={10} style={{ alignItems: "flex-start" }}>
              <Typography variant="titleLarge">Albums</Typography>
              {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </Box>
          )}
          {singles.length > 0 && (
            <Box mv={10} style={{ alignItems: "flex-start" }}>
              <Typography variant="titleLarge">Singles</Typography>
              {singles.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </Box>
          )}
        </Box>
        <Spacer size={70} />
      </ScrollView>
    </Container>
  );
};
