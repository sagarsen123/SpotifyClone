import React, { useEffect, useRef, useState, useCallback } from "react";
import "./Player.css";
import { useDispatch, useSelector } from "react-redux";
import { currTrackIdx, stopSong } from "../../actions";
import songImgSrc from "../../images/SongImgThumbnail.png";
import {
  AiFillStepBackward,
  AiFillStepForward,
  AiFillCaretRight,
} from "react-icons/ai";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import { BsPauseFill, BsVolumeUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Player = () => {
  //reducer
  const myState = useSelector((state) => state.loginAndLogout);
  const dispatch = useDispatch();
const navigate = useNavigate();

  //states
  const [trackIdx, setTrackIdx] = useState(0);
  let songsList = [];
  const [currentTrack, setCurrentTrack] = useState(
    myState.listingofweeksongs.Songs[trackIdx]
  );
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playSong, setPlaySong] = useState(true);
  //volume
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
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
    // console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token')!==null){
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress]);
  const handleProgressChange = () => {
    if(localStorage.getItem('token')!=null)
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration - 1;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  //do nothing
  const donothing = () => {};
  //useEffect
  useEffect(() => {
    if(localStorage.getItem('token')===null){navigate('/')}

    
    songsList = myState.listingofweeksongs.Songs;
    setTrackIdx(myState.currIdx);
    setCurrentTrack(songsList[trackIdx]);
    playAnimationRef.current = requestAnimationFrame(repeat);
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  
  }, [
    handleNext,
    volume,
    audioRef,
    muteVolume,
    myState.currIdx,
    myState.listingofweeksongs,
  ]);

  return (
    <div className="player">
      <audio
        ref={audioRef}
        src={currentTrack?.preview_url ? currentTrack.preview_url : ""}
        autoPlay
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => {
          trackIdx === myState.listingofweeksongs.Songs.length
            ? donothing()
            : handleNext();
        }}
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
            onClick={(e) => {
              e.target.parentElement.className === "songControls"
                ? handlePrevious()
                : donothing();
            }}
          />
        </div>
        <div className="songControls" onClick={togglePlayPause}>
          {!playSong ? (
            <AiFillCaretRight className="musicIcon" />
          ) : (
            <BsPauseFill className="musicIcon" />
          )}
        </div>
        <div className="songControls">
          <AiFillStepForward
            className={
              trackIdx === myState.listingofweeksongs.Songs.length - 1
                ? "unClickable"
                : "musicIcon"
            }
            onClick={(e) => {
              e.target.parentElement.className === "songControls"
                ? handleNext()
                : donothing();
            }}
          />
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

      {/* <div className="musicVolume">
         <BsVolumeUp />
       </div> */}
      <div className="musicVolume">
        <div
          onClick={() => setMuteVolume((prev) => !prev)}
          className="volumeIcon"
        >
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff />
          ) : volume < 40 ? (
            <IoMdVolumeLow />
          ) : (
            <IoMdVolumeHigh />
          )}
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Player;
