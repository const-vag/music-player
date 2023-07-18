import { useEffect } from 'react';
import { Song } from '../api/requests/songs.api';
import { MediaSound } from './MediaSound';
import { useStore } from './PlayerStore';
import { asyncStorage } from './hooks/useAsyncStorage';

export const ASYNC_STORAGE_SONG_KEY = 'async-storage-latest-song';

export const usePlayerControls = () => {
  const { updateSong, updateIsPlaying } = useStore((state) => ({
    updateSong: state.updateSong,
    updateIsPlaying: state.updateIsPlaying,
  }));

  const { set: setAsyncStorage, get: getAsyncStorage } = asyncStorage();

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
    setAsyncStorage(ASYNC_STORAGE_SONG_KEY, newSong);
    await play(newSong.link);
  };

  useEffect(() => {
    const getAndUpdateLatestSong = async () => {
      const storedSong = await getAsyncStorage<Song & { albumImage: string }>(
        ASYNC_STORAGE_SONG_KEY
      );
      if (storedSong) {
        updateSong(storedSong);
      }
    };
    getAndUpdateLatestSong();
  }, [getAsyncStorage, updateSong]);

  return {
    updateAndPlaySong: updateAndPlay,
    play,
    pause,
  };
};
