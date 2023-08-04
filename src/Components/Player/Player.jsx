import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Player.css";
import { useDispatch, useSelector } from "react-redux";
import { currTrackIdx } from "../../actions";
import songImgSrc from "../../images/SongImgThumbnail.png";
import {
  AiFillStepBackward,
  AiFillStepForward,
  AiFillCaretRight,
} from "react-icons/ai";
import { BsPauseFill, BsVolumeUp } from "react-icons/bs";
const Player = () => {

  //reducer
  const myState = useSelector((state) => state.loginAndLogout);
  const dispatch = useDispatch();


  //states
  const [trackIdx, setTrackIdx] = useState(0);
  let songsList = [];
  const [currentTrack, setCurrentTrack] = useState(
    myState.listingofweeksongs.Songs[trackIdx]
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playSong, setPlaySong] = useState(true);
  

  //refs
  const audioRef = useRef();
  const progressBarRef = useRef();
  const playAnimationRef = useRef();


  //audio Controls
  const togglePlayPause = () => {
    setPlaySong(!playSong);

    if (playSong) {
      audioRef.current.pause();
      console.log("pausing");
    } else {
      audioRef.current.play();
      console.log("playing");
    }
  };

  const handlePrevious = () => {
    setPlaySong(false);
    audioRef.current.pause();
    if (trackIdx === 0) return;
    setTrackIdx(trackIdx - 1);
    dispatch(currTrackIdx(trackIdx - 1));
    audioRef.current.pause();
    setPlaySong(true);
  };

  const handleNext = () => {
    setPlaySong(false);
    audioRef.current.pause();
    setTrackIdx(trackIdx + 1);
    dispatch(currTrackIdx(trackIdx + 1));
    audioRef.current.pause();
    setPlaySong(true);
  };


  //utitlity

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}.${formatSeconds}`;
    }
    return "00.00";
  };

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };


  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration - 1;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };


  //useEffect
  useEffect(() => {
    songsList = myState.listingofweeksongs.Songs;
   
    setCurrentTrack(songsList[trackIdx]);
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [handleNext, myState.listingofweeksongs]);





  
  return (
    <div className="player">
      <audio
        ref={audioRef}
        src={currentTrack?.preview_url ? currentTrack.preview_url : ""}
        autoPlay
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => handleNext()}
        controls
        style={{ display: "none" }}
      ></audio>

      <div className="songInfo">
        <div className="songInfoImg">
          {currentTrack?.album?.images ? (
            <img src={currentTrack.album.images[2].url} alt="" />
          ) : (
            <img src={songImgSrc} alt="" />
          )}
        </div>
        <div className="SongInfoDetails">
          <h4 className="songName">
            {currentTrack ? currentTrack.name : "Song Name"}
          </h4>
          <p className="artistName">
            {currentTrack?.artists
              ? currentTrack.artists[0].name
              : "Artist Name"}
          </p>
        </div>
      </div>

    
      <div className="musicControls">
        <div className="songControls">
          <AiFillStepBackward
            className={trackIdx !== 0 ? "musicIcon" : "unClickable"}
            onClick={handlePrevious}
          />
        </div>
        <div className="songControls" onClick={togglePlayPause}>
          {!playSong ? (
            <AiFillCaretRight className="musicIcon" />
          ) : (
            <BsPauseFill className="musicIcon" />
          )}
        </div>
        <div
          className={
            trackIdx === songsList.length - 1 ? "unClickable" : "songControls"
          }
          onClick={handleNext}
        >
          <AiFillStepForward className="musicIcon" />
        </div>
      </div>

      <div className=" musicdiv">
        <span className="musicTimeStamp">{formatTime(timeProgress)}</span>
        <input
          className="ProgressBar"
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange}
        />
        <span className="musicTimeStamp">{formatTime(duration)}</span>
      </div>

      <div className="musicVolume">
         <BsVolumeUp />
       </div>
    </div>
  );
};

export default Player;
