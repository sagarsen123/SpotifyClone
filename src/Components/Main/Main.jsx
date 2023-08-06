import Content from '../Content/Content'
import SideBar from '../SideBar/SideBar'
import Player from '../Player/Player'
import './Main.css'
import { useSelector } from 'react-redux'
import MobileSideBar from '../MobileSideBar/MobileSideBar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Main = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')===null)
    {
      navigate('/')
    }

  })
  const myState = useSelector(state => state.loginAndLogout)
  return ( 
    <div className="Main" >
        <SideBar isPlaying={myState.isPlaying}/>
        <Content isPlaying={myState.isPlaying}/>
       {myState.isPlaying && <Player/>}
       <MobileSideBar/>
    </div>
  )
}

export default Main