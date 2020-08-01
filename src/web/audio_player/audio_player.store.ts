import * as mobx from "mobx";
import { AudioRecord } from "shared/AudioRecord";

export enum PlayerState {
  Unstarted,
  Play,
  Loading,
  Stop
}

interface SelectedAudioRecords {
  [key: string]: AudioRecord;
}

export class AudioPlayerStore {
  audioRecords: AudioRecord[];

  @mobx.observable
  currentlyPlayingIndex: number;

  @mobx.observable
  selectedAudioRecords: SelectedAudioRecords;

  @mobx.observable
  playerState: PlayerState;

  constructor(audioRecords: Array<AudioRecord>) {
    this.audioRecords = audioRecords;
    this.selectedAudioRecords = {};
    this.playerState = PlayerState.Unstarted;
    this.currentlyPlayingIndex = -1;
  }
}
