import { useLikeSongMutation, useUnlikeSongMutation } from '../../../../api/hooks/songs.query';
import { useSnackbarControls } from '../../../../shared/stores/snackbar/useSnackbarControls';

export const useSongCard = () => {
  const { show, hide } = useSnackbarControls();
  const likeSongMutation = useLikeSongMutation();
  const unlikeSongMutation = useUnlikeSongMutation();

  return {
    likeSongMutation,
    unlikeSongMutation,
    show,
    hide,
  };
};
