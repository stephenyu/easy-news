import * as React from "react";
import * as Recoil from 'recoil';

import { AudioRecord } from 'types/types';
import { SelectedNews } from 'web/atoms/news_playlist.atom'

export const AudioCheckbox = ({ audioRecord }: {audioRecord: AudioRecord}) => {
  const setSelectedNews = Recoil.useSetRecoilState(SelectedNews);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    if (isSelected) {
      setSelectedNews(prev => new Map(prev.set(audioRecord.id, audioRecord)));
    } else {
      setSelectedNews(prev => {
        let copy = new Map(prev);
        copy.delete(audioRecord.id);
        return copy;
      })
    }
  }

  return <div>
    <input type="checkbox" id={audioRecord.id} onChange={onChange} />
    <label htmlFor={audioRecord.id}>{audioRecord.name}</label>
  </div>
}
