import { useStore } from "./SnackbarStore";

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
