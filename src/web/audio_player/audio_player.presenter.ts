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
    store.selectedAudioRecords[audioRecord.id] = audioRecord;
  }

  unselectAudioRecord(store: AudioPlayerStore, audioRecord: AudioRecord) {
    delete store.selectedAudioRecords[audioRecord.id];
  }

  setPlay(store: AudioPlayerStore) {
    store.playerState = PlayerState.Play;
  }

  setStop(store: AudioPlayerStore) {
    store.playerState = PlayerState.Stop;
  }

  getNextAudioTrack(store: AudioPlayerStore): AudioRecord {
    const audioRecordIds = Object.keys(store.selectedAudioRecords);
    return store.selectedAudioRecords[
      audioRecordIds[++store.currentlyPlayingIndex]
    ];
  }
}
