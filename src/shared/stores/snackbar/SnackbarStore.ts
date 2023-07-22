import { create } from 'zustand';

type Action = {
  show: (message: string) => void;
  hide: () => void;
};

type State = {
  isVisible: boolean;
  message: string;
};

export const useStore = create<State & Action>()((set) => ({
  message: '',
  show: (message) => {
    set(() => ({ message: message, isVisible: true }));
  },
  hide: () => {
    set(() => ({ message: '', isVisible: false }));
  },
  isVisible: false,
}));
