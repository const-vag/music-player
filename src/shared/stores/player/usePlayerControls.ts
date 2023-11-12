import { useEffect } from 'react';

import { SongWithAlbumImage } from '../../../api/requests/songs.api';
import { MediaSound } from '../../MediaSound';
import { asyncStorage } from '../../hooks/useAsyncStorage';
import { useStore } from './PlayerStore';

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
    try {
      await mediaSound.play(link);
    } catch (err) {
      console.log('🚀 ~ file: usePlayerControls.ts:33 ~ play ~ err:', err);
    }
  };

  const pause = async () => {
    await mediaSound.pause();
  };

  const updateAndPlay = async (newSong: SongWithAlbumImage) => {
    updateSong(newSong);
    setAsyncStorage(ASYNC_STORAGE_SONG_KEY, newSong);
    await play(newSong.link);
  };

  useEffect(() => {
    const getAndUpdateLatestSong = async () => {
      const storedSong = await getAsyncStorage<SongWithAlbumImage>(
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
    pause
  };
};
