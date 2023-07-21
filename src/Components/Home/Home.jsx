import "./Home.css";
import HomeNoification from "../../images/HomeNotification.png";
import HomeDp from "../../images/HomeDp.png";
import Card from "../Card/Card";
import PlaylistThumbnail from "../../images/PlaylistThumbnail.png";

const Home = () => {
  const desc =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste dolor deserunt nemo illum animi! Sequi .";
  return (
    <div className="Home">
      <div className="head">
      <div className="homeFunctions">
          <div className="notification">
            <img src={HomeNoification} alt="Notifications" />
          </div>
          <div className="profile">
            <img src={HomeDp} alt="" />
          </div>
        </div>
        <div className="headText">
          <h1>Good Evening!</h1>
        </div>
       
      </div>
      <div className="PlaylistContainer">
        <div className="playGroupHead">
          <h3>Featured Playlist</h3>
          <p>See All</p>
        </div>
        <div className="playCardsGroup">
          <Card Title="Playlist #1" imgsrc={PlaylistThumbnail} desc={desc} />
          <Card Title="Playlist #1" imgsrc={PlaylistThumbnail} desc={desc} />
          <Card Title="Playlist #1" imgsrc={PlaylistThumbnail} desc={desc} />
        </div>
      </div>
      <div className="PlaylistContainer">
        <div className="playGroupHead">
          <h3>This Week Songs</h3>
          <p>See All</p>
        </div>
        <div className="playCardsGroup">
          <Card Title="Song #1" imgsrc={PlaylistThumbnail} desc={"Artist Name"} />
          <Card Title="Song #1" imgsrc={PlaylistThumbnail} desc={"Artist Name"} />
          <Card Title="Song #1" imgsrc={PlaylistThumbnail} desc={"Artist Name"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
