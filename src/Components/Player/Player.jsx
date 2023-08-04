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
  const myState = useSelector((state) => state.loginAndLogout);
  const [trackIdx, setTrackIdx] = useState(0);
  let songsList = [];
  const [currentTrack, setCurrentTrack] = useState(
    myState.listingofweeksongs.Songs[trackIdx]
  );

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  const [playSong, setPlaySong] = useState(true);
  const dispatch = useDispatch();

  const handleNext = () => {
    setPlaySong(false);
    audioRef.current.pause();
    setTrackIdx(trackIdx + 1);
    dispatch(currTrackIdx(trackIdx + 1));
    audioRef.current.pause();
    setPlaySong(true);
  };
  useEffect(() => {
    songsList = myState.listingofweeksongs.Songs;
   
    setCurrentTrack(songsList[trackIdx]);
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [handleNext, myState.listingofweeksongs]);

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
  const handlePrevious = () => {
    setPlaySong(false);
    audioRef.current.pause();
    if (trackIdx === 0) return;
    setTrackIdx(trackIdx - 1);
    dispatch(currTrackIdx(trackIdx - 1));
    audioRef.current.pause();
    setPlaySong(true);
  };
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration - 1;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
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

      {/* <div className="songInfoImg">
        {currentTrack?.album?.images ? (
          <img src={currentTrack.album.images[2].url} alt="" />
        ) : (
          <img src={songImgSrc} alt="" />
        )}
      </div>

      <button onClick={handlePrevious}>previous</button>
      <button onClick={togglePlayPause}>play/pause</button>
      <button onClick={handleNext}>next</button> */}

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

// import "./Player.css";
// import songImgSrc from "../../images/SongImgThumbnail.png";
// import { BsPauseFill, BsVolumeUp } from "react-icons/bs";
// // import { tracks } from "../../data/tracks";
// import { useEffect, useState, useCallback, useRef } from "react";
// import Ticker from "react-ticker";
// import {
//   AiFillStepBackward,
//   AiFillStepForward,
//   AiFillCaretRight,
// } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { playingSongs, pausingSongs, currTrackIdx,playSong, stopSong } from "../../actions";

// const Player = () => {
//   //audio
//   const myState = useSelector((state) => {
//     return state.loginAndLogout;
//   });
//   const [songLoader , setSongLoader] = useState(false);
//   const progressBarRef = useRef();
//   const audioRef = useRef();
//   const dispatch = useDispatch();
//   const [timeProgress, setTimeProgress] = useState(0);
//   const [duration, setDuration] = useState(0);
//   let tracks = [];
//   const [trackIndex, setTrackIndex] = useState(0);
//   const [currTrack, setCurrentTrack] = useState(tracks[trackIndex]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const playAnimationRef = useRef();

//   const handlePrevious = () => {
//     if (trackIndex === 0) return;
// dispatch(stopSong())
//     setTrackIndex((p) => p - 1);
//     dispatch(currTrackIdx(trackIndex - 1));
//     setCurrentTrack(tracks[trackIndex - 1]);
//     dispatch(playSong())

//   };
//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//     dispatch(!isPlaying ? playingSongs() : pausingSongs());
//     if (!isPlaying) console.log("playing");
//     else console.log("paused");
//   };
//   const handleNext = () => {

//     if (trackIndex >= tracks.length - 1) {
//       setTrackIndex(0);
//       setCurrentTrack(tracks[0]);
//       dispatch(currTrackIdx(0));
//     } else {
//       setTrackIndex((prev) => prev + 1);
//       setCurrentTrack(tracks[trackIndex + 1]);
//       dispatch(currTrackIdx(trackIndex + 1));
//       }
//   };

//   // //display
//   const onLoadedMetadata = () => {
//     const seconds = audioRef.current.duration-1;
//     setDuration(seconds);
//     progressBarRef.current.max = seconds;
//   };

//   // const [pausePlay, setPausePlay] = useState(true);
//   // const [totalLen ,setTotalLen] = useState(0.0);
//   // const currLen = useRef(0);
//   // const [playProgress,setPlayProgress] = useState(0)
//   // const [songsPlaylist,setSongsPlaylist] = useState([]);

//   //controls

//   //Controls

//   // const togglePlayPause = () => {
//   //   setIsPlaying((prev) => !prev);
//   //   dispatch(!isPlaying ? playingSongs() : pausingSongs());
//   // };

//   // const handleNext = () => {
//   //   if (trackIndex >= tracks.length - 1) {
//   //     setTrackIndex(0);
//   //     setCurrentTrack(tracks[0]);
//   //   } else {
//   //     setTrackIndex((prev) => prev + 1);
//   //     setCurrentTrack(tracks[trackIndex + 1]);
//   //   }
//   // };

//   const repeat = useCallback(() => {
//     const currentTime = audioRef.current.currentTime;
//     setTimeProgress(currentTime);
//     progressBarRef.current.value = currentTime;
//     progressBarRef.current.style.setProperty(
//       "--range-progress",
//       `${(progressBarRef.current.value / duration) * 100}%`
//     );

//     playAnimationRef.current = requestAnimationFrame(repeat);
//   }, [audioRef, duration, progressBarRef, setTimeProgress]);

//   //progress bar

//   useEffect(() => {
//     setIsPlaying(myState.playingSongs);
//     tracks = myState.listingofweeksongs.Songs;
//     if (isPlaying) {
//       audioRef.current.play();
//     } else {
//       audioRef.current.pause();
//     }
//     // setTracks(myState.);
//     playAnimationRef.current = requestAnimationFrame(repeat);
//   }, [handleNext, isPlaying, repeat, audioRef, myState.currIdx]);
//   const handleProgressChange = () => {
//     audioRef.current.currentTime = progressBarRef.current.value;
//   };

//   const formatTime = (time) => {
//     if (time && !isNaN(time)) {
//       const minutes = Math.floor(time / 60);
//       const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
//       const seconds = Math.floor(time % 60);
//       const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
//       return `${formatMinutes}.${formatSeconds}`;
//     }
//     return "00.00";
//   };
//   const handleEnd = () =>{
//     togglePlayPause();

//   }
//   return (
//     <div className="player">

//   <audio
//         src={
//           currTrack
//             ? currTrack.preview_url
//             : () => {
//                 handleNext();
//                 return currTrack.preview_url;
//               }
//         }
//         autostart="0"
//         type="audio/mpeg"
//         ref={audioRef}
//         onLoadedMetadata={onLoadedMetadata}
//         style={{ display: "none" }}
//         // onEnded={handleEnd}
//         controls
//       />

//       <div className="songInfo">
//         <div className="songInfoImg">
//           {currTrack?.album?.images ? (
//             <img src={currTrack.album.images[2].url} alt="" />
//           ) : (
//             <img src={songImgSrc} alt="" />
//           )}
//         </div>
//         <div className="SongInfoDetails">

//                 <h4 className="songName">
//                   {currTrack ? currTrack.name : "Song Name"}
//                 </h4>

//           <p className="artistName">
//             {currTrack?.artists ? currTrack.artists[0].name : "Artist Name"}
//           </p>
//         </div>
//       </div>

//       <div className="musicControls">
//         <div className="songControls">
//           <AiFillStepBackward
//             className={trackIndex !== 0 ? "musicIcon" : "unClickable"}
//             onClick={handlePrevious}
//           />
//         </div>
//         <div className="songControls" onClick={togglePlayPause}>
//           {!isPlaying ? (
//             <AiFillCaretRight className="musicIcon" />
//           ) : (
//             <BsPauseFill className="musicIcon" />
//           )}
//         </div>
//         <div
//           className={
//             trackIndex === tracks.length - 1 ? "unClickable" : "songControls"
//           }
//           onClick={handleNext}
//         >
//           <AiFillStepForward className="musicIcon" />
//         </div>
//       </div>

//       <div className=" musicdiv">
//         <span className="musicTimeStamp">{formatTime(timeProgress)}</span>
//         <input
//           className="ProgressBar"
//           type="range"
//           ref={progressBarRef}
//           defaultValue="0"
//           onChange={handleProgressChange}
//         />
//         <span className="musicTimeStamp">{formatTime(duration)}</span>
//       </div>

//       <div className="musicVolume">
//         <BsVolumeUp />
//       </div>
//     </div>
//   );
// };

// export default Player;
