import { AVPlaybackStatus, Audio } from 'expo-av';

export class MediaSound {
  private soundInstance: Audio.Sound;

  private static _instance: MediaSound;

  private status: AVPlaybackStatus | undefined;

  private constructor() {
    const sound = new Audio.Sound();
    this.soundInstance = sound;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  setOnPlaybackStatusUpdate(
    ...params: Parameters<Audio.Sound['setOnPlaybackStatusUpdate']>
  ) {
    return this.soundInstance.setOnPlaybackStatusUpdate(...params);
  }

  async play(link: string) {
    try {
      await this.soundInstance.loadAsync({ uri: link }, this.status);
    } catch (err) {
      await this.soundInstance.unloadAsync();
      await this.soundInstance.loadAsync({ uri: link }, this.status);
    }

    return await this.soundInstance.playAsync();
  }

  async pause() {
    this.status = await this.soundInstance.pauseAsync();
  }

  unload() {
    this.soundInstance.unloadAsync();
  }
}
