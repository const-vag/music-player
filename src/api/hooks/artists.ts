import { useQuery } from "@tanstack/react-query";
import { getArtistRequest } from "../requests/artists";
import { isAxiosError } from "axios";

export const useArtistQuery = (id: string) => {
  const { data, isLoading } = useQuery(
    ["artist", id],
    async () => await getArtistRequest(id),
    {
      onError: (error) => {
        if (isAxiosError(error)) {
          console.log(
            "🚀 ~ file: artists.ts:12 ~ useArtistQuery ~ error:",
            error.config
          );
        }
      },
    }
  );

  return { data, isLoading };
};
