import React from "react";
import * as mobx from "mobx";
import * as mobxReact from "mobx-react";

import {
  AudioPlayerStore,
  PlayerState
} from "renderer/audio_player/audio_player.store";
import { AudioRecord } from "shared/AudioRecord";
import { AudioPlayerPresenter } from "renderer/audio_player/audio_player.presenter";

interface AudioPlayerProps {
  store: AudioPlayerStore;
}

@mobxReact.observer
export class AudioPlayer extends React.Component<AudioPlayerProps> {
  audioElementRef: React.RefObject<HTMLAudioElement>;

  presenter = new AudioPlayerPresenter();

  store: AudioPlayerStore;

  constructor(props: AudioPlayerProps) {
    super(props);
    this.store = this.props.store;
    this.audioElementRef = React.createRef();

    this.presenter = new AudioPlayerPresenter();
  }

  loadAndPlay = (audioElement: HTMLAudioElement, audioRecord: AudioRecord) => {
    audioElement.src = audioRecord.url;

    audioElement.addEventListener("loadeddata", function playAndRemove() {
      audioElement.play();
      audioElement.removeEventListener("loadeddata", playAndRemove, false);
    });
  };

  setElementRef = (element: HTMLAudioElement) => {
    const isPlaying = mobx.computed(
      () => this.store.playerState === PlayerState.Play
    );

    mobx.observe(isPlaying, change => {
      if (change.newValue === true) {
        this.loadAndPlay(element, this.presenter.getNextAudioTrack(this.store));
      }
    });

    element.addEventListener("ended", () =>
      this.loadAndPlay(element, this.presenter.getNextAudioTrack(this.store))
    );
  };

  render() {
    return <audio controls ref={this.setElementRef}></audio>;
  }
}
