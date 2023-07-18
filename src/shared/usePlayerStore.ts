import { create } from 'zustand';
import { Song } from '../api/requests/songs.api';
import { MediaSound } from './MediaSound';

type State = {
  song: Song & { albumImage: string };
  isPlaying: boolean;
};

type Action = {
  updateSong: (newSong: Song & { albumImage: string }) => void;
  updateIsPlaying: (input: boolean) => void;
};

const useStore = create<State & Action>((set) => ({
  song: {} as Song & { albumImage: string },
  isPlaying: false,
  updateSong: (newSong) => set(() => ({ song: newSong })),
  updateIsPlaying: (input) =>
    set((state) => {
      if (state.isPlaying === input) return state;
      return { isPlaying: input };
    }),
}));

export const usePlayerController = () => {
  const { song, isPlaying, updateSong, updateIsPlaying } = useStore(
    (state) => state
  );

  // TODO: Investigate the rerenders

  const mediaSound = MediaSound.Instance;

  mediaSound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded) {
      if (status.isPlaying) updateIsPlaying(true);
      else updateIsPlaying(false);
    }
  });

  const play = async (link: string) => {
    await mediaSound.play(link);
  };

  const pause = async () => {
    await mediaSound.pause();
  };

  const updateAndPlay = async (newSong: Song & { albumImage: string }) => {
    updateSong(newSong);
    await play(newSong.link);
  };

  return {
    song,
    updateAndPlaySong: updateAndPlay,
    isPlaying,
    play,
    pause,
  };
};
