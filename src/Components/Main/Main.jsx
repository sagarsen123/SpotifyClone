import Content from '../Content/Content'
import SideBar from '../SideBar/SideBar'
import Player from '../Player/Player'
import './Main.css'

const Main = () => {
  let isPlaying = true;
  return ( 
    <div className="Main" >
        <SideBar isPlaying={isPlaying}/>
        <Content isPlaying={isPlaying}/>
       {isPlaying && <Player/>}
    </div>
  )
}

export default Main