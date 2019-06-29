import React from "react";

import audioRecords from "data/indexPage.json";

import { AudioPlayer } from "audio_player/audio_player";
import { AudioPlaylist, AudioRecord } from "audio_playlist/audio_playlist";

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
