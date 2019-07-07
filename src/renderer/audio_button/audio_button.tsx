import React from "react";

import * as mobxReact from "mobx-react";

import {
  AudioPlayerStore,
  PlayerState
} from "renderer/audio_player/audio_player.store";

export interface AudioButtonProps {
  store: AudioPlayerStore;
  onClickPlay?: () => void;
  onClickPause?: () => void;
}

function getLabel(store: AudioPlayerStore): string {
  switch (store.playerState) {
    case PlayerState.Play:
      return "Pause";
    case PlayerState.Loading:
      return "Loading...";
    case PlayerState.Unstarted:
    case PlayerState.Stop:
    default:
      return "Play";
  }
}

export const AudioButton = mobxReact.observer(
  ({ store, onClickPlay, onClickPause }: AudioButtonProps) => {
    const label = getLabel(store);

    const onClick = () => {
      switch (store.playerState) {
        case PlayerState.Play:
          if (onClickPause) onClickPause();
          break;
        default:
          if (onClickPlay) onClickPlay();
          break;
      }
    };

    return (
      <React.Fragment>
        <button
          type="button"
          onClick={onClick}
          disabled={store.playerState === PlayerState.Loading}
        >
          {label}
        </button>
      </React.Fragment>
    );
  }
);
