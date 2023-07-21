import "./Search.css";
import { FiSearch } from "react-icons/fi";
import { AiFillCaretRight } from "react-icons/ai";
import albumImage from "../../images/Spotify-Albums.jpg";
import SearchSongImage from "../../images/SearchSongImage.png";
import { useState } from "react";

const Search = () => {
  const [searched, setSearched] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const handleSubmit = (e) => {
    setSearched(true);
    e.preventDefault();
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

      {searched && (
        <>
          <div className="topResultsBox">
            <h2>Top Results</h2>
            <div className="searchedResultImg">
              <img src={albumImage} alt="" />
              <p>AR Rahman Hits</p>
            </div>
          </div>
          <div className="songsBox">
            <h2>Songs</h2>
            <div className="songListContainer">
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
              <div className="searchsongContainer">
                <div className="songImgeAndDetails">
                  <div className="searchSongImage">
                    <img src={SearchSongImage} alt="" />
                  </div>
                  <div className="searchSongDetails">
                    <h4>Song #1</h4>
                    <p>Artist Name</p>
                  </div>
                </div>

                <div className="searchTimeStampAndPlay">
                  <p>4.16</p>
                  <AiFillCaretRight className="TimestampIcon" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
