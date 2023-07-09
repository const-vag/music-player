import { ArtistSimple } from './artists.api';

export interface Song {
  id: number;
  name: string;
  length: number;
  link: string;
  trackNumber: number;
  artists: ArtistSimple[];
}
