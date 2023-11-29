import { PlayerStore } from './PlayerStore';

export const usePlayerStore = () => {
  const { song, isPlaying } = PlayerStore((state) => ({
    song: state.song,
    isPlaying: state.isPlaying,
  }));

  return {
    song,
    isPlaying,
  };
};
