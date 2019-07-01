import * as mobx from "mobx";
import { AudioRecord } from "shared/AudioRecord";

export enum PlayerState {
  Unstarted,
  Play,
  Stop
}

export class AudioPlayerStore {
  audioRecords: AudioRecord[];

  selectedAudioRecords: Map<string, AudioRecord>;

  @mobx.observable
  playerState: PlayerState;

  constructor(audioRecords: Array<AudioRecord>) {
    this.audioRecords = audioRecords;
    this.selectedAudioRecords = new Map();
    this.playerState = PlayerState.Unstarted;
  }
}
