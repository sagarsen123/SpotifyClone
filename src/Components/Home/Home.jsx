import "./Home.css";
import HomeNoification from "../../images/HomeNotification.png";
import HomeDp from "../../images/HomeDp.png";
import Card from "../Card/Card";
import PlaylistThumbnail from "../../images/PlaylistThumbnail.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

const Home = () => {
  const [HomeLoading, setHomeLoading] = useState(false);
  const [fPlaylist, setFPlaylist] = useState();
  const [fSongs, setfSongs] = useState();
  const myState = useSelector((state) => {
    return state.loginAndLogout;
  });

  const getFeaturePlaylist = async () => {
    try {
      setHomeLoading(true);
      let fPlayListReceived = await axios.get(
        "https://api.spotify.com/v1/browse/featured-playlists?limit=8",
        {
          headers: {
            Authorization: `Bearer ${myState.userToken}`,
          },
        }
      );
      // console.log(fPlayListReceived.data.playlists.items);
      setFPlaylist(fPlayListReceived.data.playlists.items);
      setHomeLoading(false);
    } catch (err) {
      // console.log(err);
    }
  };
  const getFeatureSongs = async () => {
    // setHomeLoading(true);
    try {
      let fSongsReceived = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=8",
        {
          headers: {
            Authorization: `Bearer ${myState.userToken}`,
          },
        }
      );
      // console.log(fSongsReceived.data.items);
      setfSongs(fSongsReceived.data.items);
      // setHomeLoading(false);
    } catch (err) {
      // console.log(err);
    }
  };


  useEffect(() => {
    setTimeout(()=>{
      getFeaturePlaylist();
      getFeatureSongs();
    },1500)
    
  }, [window]);

  // const desc =
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste dolor deserunt nemo illum animi! Sequi .";

  return HomeLoading ? (
    <p>Loading</p>
  ) : (
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
          {fPlaylist ? (
            <div className="row">
              {fPlaylist.map((item) => {
                return (
                  <Card
                    Title={item.name}
                    key={item.id}
                    imgsrc={item.images[0].url}
                    desc={item.description}
                  />
                );
              })}
            </div>
          ) : (
            <p>Loading....</p>
          )}
        </div>
      </div>
      <div className="PlaylistContainer">
        <div className="playGroupHead">
          <h3>This Week Songs</h3>
          <p>See All</p>
        </div>
        <div className="playCardsGroup">
          {fSongs ? (
            <div className="row">
              {fSongs.map((song) => {
                return (
                  <Card
                    key={song.id}
                    className="col"
                    Title={song.name}
                    imgsrc={song.album.images[0].url}
                    desc={song.artists[0].name}
                  />
                );
              })}
            </div>
          ) : (
            <p>Loading...!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
