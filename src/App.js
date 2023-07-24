
import Login from "./Components/Login/Login.jsx";
import './App.css'
import { BrowserRouter,Routes, Route, useNavigate } from "react-router-dom";
import Main from "./Components/Main/Main.jsx";
import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "./actions/index.js";

function App() {
 const navigate = useNavigate();
 const dispatch = useDispatch();

  const [localToken,setLocalToken] = useState();



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
        setLocalToken('token');
        dispatch(updateToken(token));
      }
    }
  },[]);



  return (
  
    <div className="App">
      <Routes>
        <Route path='/' element= { <Login/> }/>
        <Route path='/main/*' element= {<Main/> }/>
      </Routes>
    </div>

  );
}

export default App;
