import "./Profile.css";
import { FiExternalLink } from "react-icons/fi";
import userDp from "../../images/UserDp.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const myState = useSelector((state) => {
    return state.loginAndLogout;
  });
  const [userProfile, SetUserProfile] = useState();
  const [Loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      // console.log(myState);
      setLoader(true);
      try{

        let userDetails = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${myState.userToken}`,
          },
        });
        SetUserProfile(userDetails.data);
        setLoader(false);
      }catch(err){
        // console.log(err);
      }
      // let userProfile = await userDetails.json();
      // console.log(userProfile);
    };
    fetchUserData();
  }, [myState.userToken]);

  return Loader && !userProfile    ? (
    <p>Loading...</p>
  ) : (
    <div className="ProfileContainer">
      <h1>Profile</h1>
      <div className="profileBox">
        <div className="ProfileDp">
          <img
            src={userProfile.images ? userProfile.images[1].url : userDp}
            alt=""
          />
        </div>
        <div className="userDetails">
          <div className="userName">
            <h2>{userProfile.display_name}</h2>
            <p>{userProfile.email}</p>
          </div>
          <button
            className="openSpotify"
            onClick={() => {
              window.open(userProfile.external_urls.spotify, "_blank");
            }}
          >
            <span>Open in Spotify</span>
            <FiExternalLink />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
