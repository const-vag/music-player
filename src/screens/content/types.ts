export enum ContentRoutes {
  ARTIST = 'Artist',
  ALBUM = 'Album',
}

export type ContentParamList = {
  [ContentRoutes.ARTIST]: {
    id: string;
  };
  [ContentRoutes.ALBUM]: {
    id: string;
  };
};
