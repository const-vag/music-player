export enum Type {
  Album = 'ALBUM',
  Single = 'SINGLE',
}

export interface Album {
  artistId: number;
  createdAt: Date;
  id: string;
  image: string;
  name: string;
  releaseDate: Date;
  type: Type;
  updatedAt: Date;
}
