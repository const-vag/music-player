import { API_URL } from "@env";
import { AxiosInterceptor } from "../AxiosInterceptor";
import { Artist } from "./artists.api";
import { Song } from "./songs.api";

const userUrl = `${API_URL}/users/me`;

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    username: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    followedArtists: Artist[];
    favoriteSongs: Song[];
}

export const getUser = async () => {
    const axios = AxiosInterceptor.Instance;
  
    return (await axios.get<User>(userUrl)).data;
  };
