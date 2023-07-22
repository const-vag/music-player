import { useStore } from "./SnackbarStore";

export const useSnackbarStore = () => {
  const { isVisible, message } = useStore((state) => ({
    isVisible: state.isVisible,
    message: state.message,
  }));

  return {
    isVisible,
    message,
  };
};
