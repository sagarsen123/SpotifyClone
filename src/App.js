
import Login from "./Components/Login/Login.jsx";
import './App.css'
import { BrowserRouter,Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Main from "./Components/Main/Main.jsx";
import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "./actions/index.js";
import PageNotFound from "./Components/pageNotFound/PageNotFound.jsx";

function App() {
 const navigate = useNavigate();
 const dispatch = useDispatch();




  useEffect(()=>{
    const gettoken = window.localStorage.getItem('token');

    if(gettoken) {
      dispatch(updateToken(gettoken));
      navigate('/main/');}
    else {

      const hash = window.location.hash;
      if( hash) {
        const token = hash.substring(1).split("&")[0].split('=')[1];
        localStorage.setItem('token',token);
        dispatch(updateToken(token));
      }
    }
  },[localStorage.getItem('token')]);



  return (
  
    <div className="App">
      <Routes>
        <Route exact path='/' element= { <Login/> }/>
        <Route  exact path='/main/*' element= {<Main/> }/>
        <Route path="/404" element={<PageNotFound/>}/>
        <Route path="*" element={<Navigate to="/404"/>}/>
      </Routes>
    </div>

  );
}

export default App;
