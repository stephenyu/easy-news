import React from "react";
import * as mobx from "mobx";
import * as mobxReact from "mobx-react";

import { AudioPlayerStore } from "renderer/audio_player/audio_player.store";
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
    audioElement.load();
    audioElement.play();

    audioElement.addEventListener("loadeddata", function playAndRemove() {
      audioElement.load();
      audioElement.play();
      audioElement.removeEventListener("loadeddata", playAndRemove, false);
    });
  };

  @mobx.computed
  get audioElementSrc() {
    const keys = Object.keys(this.store.selectedAudioRecords);
    return keys.length > 0 ? this.store.selectedAudioRecords[keys[0]].url : "";
  }

  setElementRef = (element: HTMLAudioElement) => {
    // const isPlaying = mobx.computed(
    //   () => this.store.playerState === PlayerState.Play
    // );

    // const isStopped = mobx.computed(
    //   () => this.store.playerState === PlayerState.Stop
    // );

    // mobx.observe(isPlaying, change => {
    //   if (change.newValue === true) {
    //     this.loadAndPlay(element, this.presenter.getNextAudioTrack(this.store));
    //   }
    // });

    // mobx.observe(isStopped, change => {
    //   if (change.newValue === true) {
    //     element.pause();
    //   }
    // });

    element.addEventListener("ended", () =>
      this.loadAndPlay(element, this.presenter.getNextAudioTrack(this.store))
    );
  };

  render() {
    return (
      <React.Fragment>
        <audio
          controls
          ref={this.setElementRef}
          src={this.audioElementSrc}
        ></audio>
      </React.Fragment>
    );
  }
}
