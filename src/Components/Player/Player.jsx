import "./Player.css";
import songImgSrc from "../../images/SongImgThumbnail.png";
import { BsPauseFill,BsVolumeUp } from "react-icons/bs";

import { useState } from "react";


import {
  AiFillStepBackward,
  AiFillStepForward,
  AiFillCaretRight,
} from "react-icons/ai";
const Player = () => {
  const [pausePlay, setPausePlay] = useState(true);
  return (
    <div className="player">
      <div className="songInfo">
        <div className="songInfoImg">
          <img src={songImgSrc} alt="" />
        </div>
        <div className="SongInfoDetails">
          <h4 className="songName">Song Name</h4>
          <p className="artistName">Artist Name</p>
        </div>
      </div>

      <div className="musicControls">
        <div className="songControls">
          <AiFillStepBackward
            className="musicIcon"
            onClick={() => console.log("clicked")}
          />
        </div>
        <div className="songControls" onClick={() => setPausePlay(!pausePlay)}>
          {pausePlay ? (
            <AiFillCaretRight className="musicIcon" />
          ) : (
            <BsPauseFill className="musicIcon" />
          )}
        </div>
        <div className="songControls">
          <AiFillStepForward className="musicIcon" />
        </div>
      </div>

      <div className="musicdiv">
        <p className="musicTimeStamp">2.16</p>
        <div className="ProgressBar">
          <div className="currentProgress"></div>
        </div>
        <p className="musicTimeStamp">4.16</p>
      </div>


      <div className="musicVolume">
     <BsVolumeUp/>
      </div>
    </div>
  );
};

export default Player;
