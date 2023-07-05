import { RouteProp, useRoute } from "@react-navigation/native";
import { ContentParamList, ContentRoutes } from "../types";

type ArtistRouteProp = RouteProp<ContentParamList, ContentRoutes.ARTIST>;

export const useArtist = () => {
  const { params } = useRoute<ArtistRouteProp>();
  console.log("🚀 ~ file: useArtist.ts:8 ~ useArtist ~ params.id:", params.id);

  return { params };
};
