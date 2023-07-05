import { API_URL } from "@env";
import { getAxiosInterceptor } from "../getAxiosInterceptor";

const artistsUrl = `${API_URL}/artists`;

export const getArtistRequest = async (id: string) => {
  const axios = await getAxiosInterceptor();

  return (await axios.get(`${artistsUrl}/${id}`)).data;
};

export const getArtistsRequest = async () => {
  const axios = await getAxiosInterceptor();

  return (await axios.get(artistsUrl)).data;
};
