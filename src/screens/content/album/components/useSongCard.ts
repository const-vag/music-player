import { useEffect } from 'react';
import { useLikeSongMutation } from '../../../../api/hooks/songs.query';
import { useSnackbarControls } from '../../../../shared/stores/snackbar/useSnackbarControls';
import { useSnackbarStore } from '../../../../shared/stores/snackbar/useSnackbarStore';

export const useSongCard = () => {
  const { show, hide } = useSnackbarControls();
  const { isVisible } = useSnackbarStore();
  const likeSongMutation = useLikeSongMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      hide();
    }, 2000);
    return () => clearTimeout(timer);
  }, [hide, isVisible]);

  return {
    likeSongMutation,
    show,
    hide,
  };
};
