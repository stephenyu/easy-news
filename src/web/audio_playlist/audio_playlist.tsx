import * as React from "react";
import * as Recoil from 'recoil';

import { NewsPlaylist } from 'web/atoms/news_playlist.atom';
import { AudioCheckbox } from "web/audio_checkbox/audio_checkbox";

export const AudioPlaylist = () => {
  const newsPlaylist = Recoil.useRecoilValue(NewsPlaylist);

  return <>
    {newsPlaylist.map(audioRecord => (
      <AudioCheckbox key={audioRecord.id} audioRecord={audioRecord} />
    ))}
  </>
}
