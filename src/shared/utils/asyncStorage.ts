import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorage = () => ({
  set: async <T>(key: string, value: T) =>
    await AsyncStorage.setItem(key, JSON.stringify(value)),
  get: async <T>(key: string): Promise<T | undefined> => {
    const stringifiedSong = await AsyncStorage.getItem(key);
    if (stringifiedSong) {
      return JSON.parse(stringifiedSong);
    }
  },
  remove: async (key: string) => await AsyncStorage.removeItem(key),
});
