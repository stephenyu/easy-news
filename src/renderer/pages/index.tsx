import React from "react";

import audioRecords from "./indexPage.json";

import { AudioPlayer } from "renderer/audio_player/audio_player";
import { AudioPlaylist } from "renderer/audio_playlist/audio_playlist";
import { AudioRecord } from "shared/AudioRecord";

interface IndexPageProps {
  audioRecords: Array<AudioRecord>;
}

export default class IndexPage extends React.Component<IndexPageProps> {
  static getInitialProps() {
    return {
      audioRecords
    };
  }
  render() {
    return (
      <React.Fragment>
        <AudioPlayer></AudioPlayer>
        <AudioPlaylist audioRecords={this.props.audioRecords}></AudioPlaylist>
      </React.Fragment>
    );
  }
}
