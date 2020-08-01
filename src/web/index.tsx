import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Recoil from 'recoil';

import { AudioPlayer } from "web/audio_player/audio_player";
import { AudioPlaylist } from "web/audio_playlist/audio_playlist";
/* import { AudioRecord } from "shared/AudioRecord"; */
/* import { AudioControls } from "web/audio_controls/audio_controls"; */

/* import { AudioPlayerStore } from "web/audio_player/audio_player.store"; */
/* import { AudioPlayerPresenter } from "web/audio_player/audio_player.presenter"; */

/* const src = "https://helloworld.mp3"; */

const Application = () => <React.Fragment>
  <AudioPlayer/>
  <AudioPlaylist/>
  {/* <AudioControls */}
  {/*   store={this.store} */}
  {/*   onClickPlay={this.onPlayClick} */}
  {/*   onClickPause={this.onPauseClick} */}
  {/* ></AudioControls> */}
</React.Fragment>

const App = () => <Recoil.RecoilRoot>
  <Application />
</Recoil.RecoilRoot>

ReactDOM.render(<App />, document.getElementById('root'));
