import { RouteProp, useRoute } from "@react-navigation/native";
import { ContentParamList, ContentRoutes } from "../types";
import { useArtistQuery } from "../../../api/hooks/artists";

type ArtistRouteProp = RouteProp<ContentParamList, ContentRoutes.ARTIST>;

export const useArtist = () => {
  const { params } = useRoute<ArtistRouteProp>();

  const { data, isLoading } = useArtistQuery(params.id);
  return { artist: data, isLoading };
};
