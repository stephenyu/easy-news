import React from "react";

import { AudioPlayer } from "audio_player/audio_player";

// const Message = ({ message }: { message: string }) => (
//   <span>Within Renderer Folder: {message}</span>
// );

export default class IndexPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AudioPlayer></AudioPlayer>
      </React.Fragment>
    );
  }
}
