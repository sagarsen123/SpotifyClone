import "./Profile.css";
import { FiExternalLink } from "react-icons/fi";
import userDp from "../../images/UserDp.png";

const Profile = () => {
  return (
    <div className="ProfileContainer">
      <h1>Profile</h1>
      <div className="profileBox">
        <div className="ProfileDp">
          <img src={userDp} alt="" />
        </div>
        <div className="userDetails">
          <div className="userName">
            <h2>User Display Name</h2>
            <p>aaaa@gmail.com</p>
          </div>
          <button className="openSpotify">
            <span>Open in Spotify</span> <FiExternalLink />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
