import { create } from 'zustand';
import { Song } from '../api/requests/songs.api';
import { equals } from 'ramda';

type Action = {
  updateSong: (newSong: Song & { albumImage: string }) => void;
  updateIsPlaying: (input: boolean) => void;
};

type State = {
  song: Song & { albumImage: string } | undefined;
  isPlaying: boolean;
};

export const useStore = create<State & Action>()((set) => ({
  song: undefined,
  isPlaying: false,
  updateSong: (newSong) =>
    set((state) => {
      if (equals(state.song, newSong)) return state;
      return { song: newSong };
    }),
  updateIsPlaying: (input) =>
    set((state) => {
      if (state.isPlaying === input) return state;
      return { isPlaying: input };
    }),
}));
