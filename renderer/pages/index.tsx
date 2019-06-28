import React from "react";

import { AudioPlayer } from "audio_player/audio_player";
import { AudioPlaylist, AudioRecord } from "audio_playlist/audio_playlist";

interface IndexPageProps {
  audioRecords: Array<AudioRecord>;
}

export default class IndexPage extends React.Component<IndexPageProps> {
  static getInitialProps() {
    return {
      audioRecords: [
        {
          id: "bbc",
          name: "BBC",
          url:
            "//open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/w1msh27cqrdrcj4.mp3"
        },
        {
          id: "cbc",
          name: "CBC",
          url: "http://podcast.cbc.ca/mp3/hourlynews.mp3"
        },
        {
          id: "wsj",
          name: "Wall Street Journal",
          url:
            "https://dcs.megaphone.fm/WSJ4093146914.mp3?key=a1119b23405fefa16c564ad6ac2f3262"
        }
      ]
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
