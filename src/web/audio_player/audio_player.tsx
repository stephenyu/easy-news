import * as React from "react";
import { useCurrentNews } from 'web/atoms/news_playlist.atom'

type PlayerProps = {
  audioSrc: string;
  onEnded?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
}

enum PlayerState {
  STOP,
  PLAYING,
  PAUSED,
  NO_CONTENT,
}

const Player = ({ onEnded, onPause, onPlay, audioSrc }: PlayerProps) => {
  const [playerState, setPlayerState] = React.useState<PlayerState>(PlayerState.STOP);
  const elementRef = React.useRef<HTMLAudioElement>();

  const handleOnEnded = React.useCallback(() => onEnded(), [onEnded])
  const handleOnPlay = React.useCallback(() => {
    setPlayerState(PlayerState.PLAYING);

    if (onPlay) {
      onPlay()
    }
  }, [onPlay])

  const audioElementRef = (element: HTMLAudioElement) => {
    if (element) {
      elementRef.current = element;
      elementRef.current.addEventListener("ended", handleOnEnded);
      elementRef.current.addEventListener("play", handleOnPlay);
    } else {
      elementRef.current.removeEventListener("ended", handleOnEnded);
      elementRef.current = null;
    }
  }

  React.useEffect(() => {
    if (elementRef.current) {
      const audioElement = elementRef.current;

      if (playerState === PlayerState.PLAYING) {
        audioElement.addEventListener("loadeddata", function playAndRemove() {
          audioElement.load();
          audioElement.play();
          audioElement.removeEventListener("loadeddata", playAndRemove, false);
        });
      }
    }
  }, [audioSrc])

  return <audio ref={audioElementRef} controls src={audioSrc}/>;
}

export const AudioPlayer = () => {
  const [currentNews, getNext] = useCurrentNews();

  const audioUrl = (currentNews)
    ? currentNews.url
    : undefined

  return <>
    <Player onEnded={getNext} audioSrc={audioUrl}/>
  </>;
}

