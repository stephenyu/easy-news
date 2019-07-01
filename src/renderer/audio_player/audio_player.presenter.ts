import {
  PlayerState,
  AudioPlayerStore
} from "renderer/audio_player/audio_player.store";

import { AudioRecord } from "shared/AudioRecord";

export class AudioPlayerPresenter {
  createStore(audioRecords: Array<AudioRecord>) {
    return new AudioPlayerStore(audioRecords);
  }

  selectAudioRecord(store: AudioPlayerStore, audioRecord: AudioRecord) {
    store.selectedAudioRecords.set(audioRecord.id, audioRecord);
  }

  unselectAudioRecord(store: AudioPlayerStore, audioRecord: AudioRecord) {
    store.selectedAudioRecords.delete(audioRecord.id);
  }

  setPlay(store: AudioPlayerStore) {
    store.playerState = PlayerState.Play;
  }
}
