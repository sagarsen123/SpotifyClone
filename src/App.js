
import Login from "./Components/Login/Login.jsx";
import './App.css'
import Main from "./Components/Main/Main.jsx";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { UseSelector,useDispatch, useSelector } from "react-redux";

function App() {
  const myState = useSelector((state)=>state.loginAndLogout);
console.log(myState)
  
  useEffect(()=>{
    const hash = window.location.hash;
    let  token = null;
    if(hash)  token = hash.substring(1).split('&')[0].split('=')[1];
  },[])
  return (
    <BrowserRouter>
    <div className="App">
      {!myState.login ? <Login/> : <Main/>}
    
    </div>
    </BrowserRouter>
  );
}

export default App;
