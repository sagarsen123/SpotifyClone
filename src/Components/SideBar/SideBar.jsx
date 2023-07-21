import "./SideBar.css";
import SideBarLogo from "../../images/SideBarLogo.png";
import { AiFillHome } from "react-icons/ai";
import { BiUserCircle, BiSolidPlaylist } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link ,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {logOutUser} from '../../actions/index'
import { useDispatch } from "react-redux";


const SideBar = (props) => {

  const dispatch = useDispatch();
  const location = useLocation(); // returns window.location object
  const [active, setActive] = useState(null);
  
  
  useEffect(() => {
    setActive(location.pathname)
  }, [location]);


  const handleLogout = (e) =>{
    e.preventDefault();
    dispatch(logOutUser());
  }


  return (
    <div
      className="SideBar"
      style={props.isPlaying ? { height: "calc(100vh - 6.8rem)" } : {}}
    >
      <div className="sideBarLogo">
        <img src={SideBarLogo} alt="" />
      </div>
      <div className="SideBarNavigation">
        <nav className="navbar">
          <ul>
            <Link
              to="/"
              className={"navLink" + (active === "/" ? " active" : "")}
            >
              <AiFillHome />
              <span>Home</span>
            </Link>
            <Link
              to="/Profile"
              className={"navLink" + (active === "/Profile" ? " active" : "")}
            >
              <BiUserCircle />
              <span>Profile</span>
            </Link>
            <Link
              to="/Search"
              className={"navLink" + (active === "/Search" ? " active" : "")}
            >
              <BsSearch />
              <span>Search</span>
            </Link>
            <Link
              to="/Featured-Playlist"
              className={
                "navLink" + (active === "/Featured-Playlist" ? " active" : "")
              }
            >
              <BiSolidPlaylist />
              <span>Featured PlayLinkst</span>
            </Link>
          </ul>
        </nav>
        <Link className="logoutBtn" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
