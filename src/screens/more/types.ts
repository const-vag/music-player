export enum MoreRoutes {
  MORE = 'More Screen',
  FOLLOWED_ARTISTS_SCREEN = 'Followed Artists Screen',
  FAVORITE_SONGS = 'Favorite songs',
}

export type MoreStackParamList = {
  [MoreRoutes.MORE]: undefined;
  [MoreRoutes.FOLLOWED_ARTISTS_SCREEN]: undefined;
  [MoreRoutes.FAVORITE_SONGS]: undefined;
};
