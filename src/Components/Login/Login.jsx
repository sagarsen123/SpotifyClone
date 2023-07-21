// import React, { useState ,useEffect} from "react";
import React, { useState } from "react";
import "./Login.css";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../../actions";

import Login_Logo from "../../images/Login_Logo.png";

const Login = () => {

  // const dispatch = useDispatch();


  const [username, setUsername] = useState("");
  const [user_password, setUser_password] = useState("");
  const [chUsername, setChUsername] = useState(false);
  const [blankUsername, setBlankUsername] = useState(false);
  const [chUserpwd, setChUserpwd] = useState(false);
  const [blankUserpwd, setBlankUserpwd] = useState(false);

  



  
  // useEffect(()=>{
  //   const hash = window.location.hash;
  //   let  token = window.localStorage.getItem('token');
     
  //   if(token && hash)
  //   {
  //    token = hash.substring(1).split('&').find(elem => elem.startsWith("access_token")).split('=')[1];
  //   window.location.hash = "";
  //   window.localStorage.setItem('token',token);
  //   props.saveToken(token);

  //   }
  // },[])

  const handleSubmit =  (e) => {
    e.preventDefault();

    if (!username) return setChUsername(true);
    if (!user_password) return setBlankUserpwd(true);
    
   


    const clientID = "a1e0a63c7e72420c84821373f1364d6b";
    const redirectURL = "http://localhost:3000/";
    const apiURL = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiURL}?client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`

    // dispatch(loginUser());
  }

  

  return (
    <div className="Login-Container">
      <div className="Login">
        <div className="Spotify_logo">
          <img src={Login_Logo} alt="" />
        </div>
        <div className="Login_Heading">
          <h3>Login</h3>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="username  formInput">
            <BiUserCircle />
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setBlankUsername(false);
                setChUsername();
                setUsername(e.target.value);
              }}
              placeholder="Username"
            />

            {blankUsername && <p>* Username can not be blank</p>}
            {chUsername && <p>* Please Check Your Username</p>}
          </div>
          <div className="user_password formInput">
            <RiLockPasswordLine />
            <input
              type="password"
              value={user_password}
              placeholder="Password"
              onChange={(e) => {
                setBlankUserpwd(false);
                setChUserpwd(false);
                setUser_password(e.target.value);
              }}
            />
            {blankUserpwd && <p>* Password can not be blank</p>}
            {chUserpwd && <p>* Incorrect Password</p>}
          </div>
          <button type="submit" className="form-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
};

export default Login;
