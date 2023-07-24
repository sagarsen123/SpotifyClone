import "./Search.css";
import { FiSearch } from "react-icons/fi";
import { AiFillCaretRight } from "react-icons/ai";
import albumImage from "../../images/Spotify-Albums.jpg";
import SearchSongImage from "../../images/SearchSongImage.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import searchHome from "../../images/SearchHome.png";

const Search = () => {
  const [searched, setSearched] = useState(false);
  const [searchResponse, setSearchResponse] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [searchedArtists, setSearchedArtists] = useState([]);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const myState = useSelector((state) => state.loginAndLogout);

  const getSearch = async () => {
    try {
      let fetchedResult = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track%2Cartist&limit=12`,
        {
          headers: {
            Authorization: `Bearer ${myState.userToken}`,
          },
        }
      );
      setSearchResponse(fetchedResult);
      setSearchedArtists(fetchedResult.data.artists.items);
      setSearchedSongs(fetchedResult.data.tracks.items);
      console.log(searchedSongs);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(false);
    getSearch();
    setSearched(true);
  };

  return (
    <div className="searchBarContainer">
      <div className="SearchBox">
        <form className="searchBar" onSubmit={handleSubmit}>
          <FiSearch className="searchIcon" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for artists, music and genres..."
          />
        </form>
      </div>

      {searched ? (
        searchResponse ? (
          <>
            <div className="topResultsBox">
              {searchedArtists && (
                <>
                  <h2>Top Artists</h2>
                  <div className="row">
                    {searchedArtists.map((artist) => {
                      return (
                        <div
                          key={artist ? artist.id : ""}
                          className="searchedResultImg"
                        >
                          <img
                            src={
                              artist.images.length > 0
                                ? artist.images[0].url
                                : albumImage
                            }
                            alt=""
                          />
                          <p>{artist.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <div className="songsBox">
              <h2>Songs</h2>
              <div className="songListContainer">
                {searchedSongs !== 0 &&
                  searchedSongs.map((song) => {
                    return (
                      <div className="searchsongContainer">
                        <div className="songImgeAndDetails">
                          <div className="searchSongImage">
                            <img src={song.album.images? song.album.images[0].url :SearchSongImage} alt="" />
                          </div>
                          <div className="searchSongDetails">
                            <h4>{song.name}</h4>
                            <p>
                              {song.artists
                                ? song.artists[0].name
                                : "Artist Name"}
                            </p>
                          </div>
                        </div>
                        <div className="searchTimeStampAndPlay">
                          <p>{Math.floor((song.duration_ms/1000) /60) + "." + Math.floor((song.duration_ms/1000) %60)}</p>
                          <AiFillCaretRight className="TimestampIcon" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <div>Sorry no Results to show</div>
        )
      ) : (
        <div
          style={{
            height: "20rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={searchHome}
            style={{ position: "relative", height: "30rem", top: "50%" }}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default Search;
