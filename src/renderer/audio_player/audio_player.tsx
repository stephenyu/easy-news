import React from "react";
import * as mobx from "mobx";
import * as mobxReact from "mobx-react";

import {
  AudioPlayerStore,
  PlayerState
} from "renderer/audio_player/audio_player.store";

interface AudioPlayerProps {
  store: AudioPlayerStore;
}

@mobxReact.observer
export class AudioPlayer extends React.Component<AudioPlayerProps> {
  audioElementRef: React.Ref<HTMLAudioElement>;

  constructor(props: AudioPlayerProps) {
    super(props);
    this.audioElementRef = React.createRef();

    const isPlaying = mobx.computed(
      () => this.props.store.playerState === PlayerState.Play
    );

    mobx.observe(isPlaying, change => {
      if (change.newValue === true) {
        console.log("Time to play!");
      }
    });
  }

  render() {
    return <audio controls ref={this.audioElementRef}></audio>;
  }
}
