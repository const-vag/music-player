import { create } from 'zustand';

type Action = {
  hideMiniPlayer: () => void;
  showMiniPlayer: () => void;
  minimize: () => void;
  maximize: () => void;
};

type State = {
  isVisible: boolean;
  isMinimized: boolean;
};

const MiniPlayerStore = create<State & Action>()((set) => ({
  isVisible: true,
  isMinimized: false,
  hideMiniPlayer: () =>
    set(() => ({
      isVisible: false,
    })),
  showMiniPlayer: () =>
    set(() => ({
      isVisible: true,
    })),
  minimize: () =>
    set(() => ({
      isMinimized: true,
    })),
  maximize: () =>
    set(() => ({
      isMinimized: false,
    })),
}));

export const useMiniPlayerStore = () => {
  const isVisible = MiniPlayerStore((state) => state.isVisible);
  const isMinimized = MiniPlayerStore((state) => state.isMinimized);
  return { isVisible, isMinimized };
};

export const useMiniPlayerControls = () => {
  const controls = MiniPlayerStore((state) => ({
    hideMiniPlayer: state.hideMiniPlayer,
    showMiniPlayer: state.showMiniPlayer,
    minimize: state.minimize,
    maximize: state.maximize,
  }));
  return controls;
};
