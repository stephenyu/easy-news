import React from "react";
import * as mobxReact from "mobx-react";

import { AudioCheckbox } from "renderer/audio_checkbox/audio_checkbox";
import { AudioRecord } from "shared/AudioRecord";

type AudioPlaylistProps = {
  audioRecords: Array<AudioRecord>;
  onSelect: (audioRecord: AudioRecord) => void;
  onUnselect: (audioRecord: AudioRecord) => void;
};

@mobxReact.observer
export class AudioPlaylist extends React.Component<AudioPlaylistProps> {
  constructor(props: AudioPlaylistProps) {
    super(props);
  }

  render() {
    return (
      <form>
        {this.props.audioRecords.map(audioRecord => (
          <AudioCheckbox
            key={audioRecord.id}
            audioRecord={audioRecord}
            onSelect={this.props.onSelect}
            onUnselect={this.props.onUnselect}
          />
        ))}
      </form>
    );
  }
}
