import { useLikeSongMutation } from '../../../../api/hooks/songs.query';

export const useSongCard = () => {
  const likeSongMutation = useLikeSongMutation();
  return { likeSongMutation };
};
