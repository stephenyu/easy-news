import React from "react";

import audioRecords from "./indexPage.json";

import { AudioPlayer } from "renderer/audio_player/audio_player";
import { AudioPlaylist } from "renderer/audio_playlist/audio_playlist";
import { AudioRecord } from "shared/AudioRecord";

import { AudioPlayerStore } from "renderer/audio_player/audio_player.store";
import { AudioPlayerPresenter } from "renderer/audio_player/audio_player.presenter";

interface IndexPageProps {
  audioRecords: Array<AudioRecord>;
}

export default class IndexPage extends React.Component<IndexPageProps> {
  private presenter: AudioPlayerPresenter;
  private store: AudioPlayerStore;

  static getInitialProps() {
    return {
      audioRecords
    };
  }

  constructor(props: IndexPageProps) {
    super(props);

    this.presenter = new AudioPlayerPresenter();
    this.store = this.presenter.createStore(props.audioRecords);
  }

  onSelect = (audioRecord: AudioRecord) => {
    this.presenter.selectAudioRecord(this.store, audioRecord);
  };

  onUnselect = (audioRecord: AudioRecord) => {
    this.presenter.unselectAudioRecord(this.store, audioRecord);
  };

  onPlayClick = () => {
    this.presenter.setPlay(this.store);
  };

  render() {
    return (
      <React.Fragment>
        <AudioPlayer store={this.store}></AudioPlayer>
        <AudioPlaylist
          audioRecords={this.store.audioRecords}
          onSelect={this.onSelect}
          onUnselect={this.onUnselect}
          onPlayClick={this.onPlayClick}
        ></AudioPlaylist>
      </React.Fragment>
    );
  }
}
