import * as Recoil from 'recoil';
import * as React from 'react';
import { AudioRecord } from 'types/types';

import sources from '../artifacts/news_sources.json'

export const NewsPlaylist = Recoil.selector<AudioRecord[]>({
  key: 'news-playlist',
  get: () => sources,
});

export const SelectedNews = Recoil.atom<Map<string, AudioRecord>>({
  key: 'selected-playlist',
  default: new Map()
});

export const useCurrentNews = (): [AudioRecord, () => void] => {
  const [playlist, setPlaylist] = React.useState<string[]>([]);
  const [current, setCurrent] = React.useState<AudioRecord>();
  const selectedNews = Recoil.useRecoilValue(SelectedNews);

  React.useEffect(() => {
    const ids: string[] = [];
    selectedNews.forEach(audioRecord => {
      ids.push(audioRecord.id);
    })

    setPlaylist(ids);
    setCurrent((ids.length > 0) ? selectedNews.get(ids[0]) : null);
  }, [selectedNews])

  const getNext = () => {
    setCurrent(current => {
      const index = playlist.indexOf(current.id);
      return ((index + 1) === playlist.length)
        ? null
        : selectedNews.get(playlist[index + 1])
    });
  };

  return [current, getNext];
}
