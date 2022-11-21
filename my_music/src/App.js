import {useState,useRef} from 'react';
import './App.css';
import data from './data'
import Song from './component/song'
import {useReducer} from 'react';
import styled from 'styled-components'
import Player from './component/player'
function App() {
  const audioref= useRef(null);
  const[songs,setSongs]= useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying]=useState(false);
  const[songInfo, setSongInfo]= useState({
    currentTime : 0,
    duration : 0,

});
  const onTimeHandler =(e)=>{
    const currentTime= e.target.currentTime;
    const duration= e.target.duration;
     setSongInfo({...songInfo,currentTime,duration})
  }
  const onSongEndHandler=async()=>{
    const currentIndex= songs.findIndex((song)=>{
      return song.id===currentSong.id})
    
    const nextSong=[(currentIndex+1)%(songs.length)]
     await setCurrentSong(nextSong)
     
     
     const newSongs = songs.map((song)=>{
      if (song.id===nextSong.id){
      return {...song,active:true}
      } else {
        return{...song,active:false}
      }
     })
     setSongs(newSongs)

  }
  return(
    <AppContainer>
    <Song currentSong= {currentSong}/>
    <Player
    currentSong={currentSong}
    setCurrentSong={setCurrentSong}
    isPlaying={isPlaying}
    setIsPlaying={setIsPlaying}
    songInfo={songInfo}
    setSongInfo={setSongInfo}
    audioref={audioref}
    songs={songs}
    setSongs={setSongs}

    />
    <audio
    onLoadedMetadata={onTimeHandler}
    onTimeUpdate={onTimeHandler}
    onEnded={onSongEndHandler}
    ref={audioref}
    src={currentSong.audio}

    />

    </AppContainer>
  );
}

const AppContainer = styled.div`
     
     `;

export default App;