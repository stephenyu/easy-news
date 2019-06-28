import React from "react";
import * as mobx from "mobx";
import * as mobxReact from "mobx-react";

import { AudioCheckbox } from "audio_checkbox/audio_checkbox";

export type AudioRecord = {
  id: string;
  name: string;
  url: string;
};

type AudioPlaylistStoreProperties = {
  audioRecords: Array<AudioRecord>;
};

class AudioPlaylistPresenter {
  createStore(spec: AudioPlaylistStoreProperties) {
    return new AudioPlaylistStore(spec);
  }

  selectAudio(store: AudioPlaylistStore, audioRecord: AudioRecord) {
    store.selectedAudioRecords.set(audioRecord.id, audioRecord);
  }

  unselectAudio(store: AudioPlaylistStore, audioRecord: AudioRecord) {
    store.selectedAudioRecords.delete(audioRecord.id);
  }
}

class AudioPlaylistStore {
  audioRecords: Array<AudioRecord>;

  @mobx.observable
  selectedAudioRecords: Map<string, AudioRecord>;

  constructor({ audioRecords }: AudioPlaylistStoreProperties) {
    this.audioRecords = audioRecords;
    this.selectedAudioRecords = new Map();
  }
}

type AudioPlaylistProps = {
  audioRecords: Array<AudioRecord>;
};

@mobxReact.observer
export class AudioPlaylist extends React.Component<AudioPlaylistProps> {
  private presenter: AudioPlaylistPresenter;
  private store: AudioPlaylistStore;

  constructor(props: AudioPlaylistProps) {
    super(props);
    this.presenter = new AudioPlaylistPresenter();
    this.store = this.presenter.createStore({
      audioRecords: props.audioRecords
    });
  }

  onAudioCheckboxSelect = (audioRecord: AudioRecord) =>
    this.presenter.selectAudio(this.store, audioRecord);

  onAudioCheckboxUnselect = (audioRecord: AudioRecord) =>
    this.presenter.unselectAudio(this.store, audioRecord);

  render() {
    return (
      <form>
        {this.store.audioRecords.map(audioRecord => (
          <AudioCheckbox
            key={audioRecord.id}
            audioRecord={audioRecord}
            onSelect={this.onAudioCheckboxSelect}
            onUnselect={this.onAudioCheckboxUnselect}
          />
        ))}
        <button id="start-button" type="button">
          Play
        </button>
      </form>
    );
  }
}
