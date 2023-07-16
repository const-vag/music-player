export enum ContentRoutes {
  ARTIST = 'Artist',
  ALBUM = 'Album',
}

export type ContentParamList = {
  [ContentRoutes.ARTIST]: {
    id: number;
  };
  [ContentRoutes.ALBUM]: {
    id: number;
  };
};
