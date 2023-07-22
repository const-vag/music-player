import { useStore } from "./SnackbarStore";

export const ASYNC_STORAGE_SONG_KEY = 'async-storage-latest-song';

export const useSnackbarControls = () => {
  const { show, hide } = useStore((state) => ({
    show: state.show,
    hide: state.hide,
  }));

  return {
    show,
    hide,
  };
};
