import React, { useRef, useState, useCallback } from "react";
import Controls from "../../../../components/MusicPlay/Controls/Controls";
import PlayList from "../../../../components/MusicPlay/PlayList/PlayList";
import ProgressArea from "../../../../components/MusicPlay/ProgrssArea/ProgressArea";
import SongDetail from "../../../../components/MusicPlay/SongDetail/SongDetail";
import "./MusicPlay.scss";

function MusicPlay() {
  const audioRef = useRef();
  const [showPlayList, setshowPlayList] = useState(false);

  const onPlay = useCallback(() => {
    audioRef.current.play();
  }, []);

  const onPause = useCallback(() => {
    audioRef.current.pause();
  }, []);

  const changeVolume = useCallback((volume) => {
    audioRef.current.changeVolume(volume);
  }, []);

  const resetDuration = useCallback(() => {
    audioRef.current.resetDuration();
  }, []);

  return (
    <>
      <div className="music-container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          setshowPlayList={setshowPlayList}
          play={onPlay}
          pause={onPause}
          changeVolume={changeVolume}
          resetDuration={resetDuration}
        />
        <PlayList setshowPlayList={setshowPlayList} showPlayList={showPlayList} />
      </div>
    </>
  );
}

export default MusicPlay;
