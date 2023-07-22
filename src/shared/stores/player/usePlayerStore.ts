import { useStore } from './PlayerStore';

export const usePlayerStore = () => {
  const { song, isPlaying } = useStore((state) => ({
    song: state.song,
    isPlaying: state.isPlaying,
  }));

  return {
    song,
    isPlaying,
  };
};
