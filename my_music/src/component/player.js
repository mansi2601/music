import {useState,useRef} from 'react';
import styled from 'styled-components'
import  {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft,faAngleRight,faPlay,faPause} from '@fortawesome/free-solid-svg-icons';
const pointer ={ cursor :"pointer"}
function Player({
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    songInfo,
    setSongInfo,
    audioref,
    songs,
    setSongs,
}) {
    const playSongHandler = ()=>{
        if(isPlaying){
            audioref.current.pause()
            setIsPlaying(!isPlaying)
        }else{
            audioref.current.play()
            setIsPlaying(!isPlaying)
        }

        }
    const getTime=(time)=>{
        const minute=Math.floor(time/60)
        const seconds=("0"+ Math.floor(time%60)).slice(-2); 
        return  `${minute}:${seconds}`
    }
    const dragHandler =(e)=>{
        audioref.current.currentTime= e.target.value
        setSongInfo({...songInfo,currentTime:e.target.value})
    }
    const touglePlayPauseIcon =()=>{
        if(isPlaying){
            return faPause
        } else{
            return faPlay
        }
    }
    
    const skipMusic= async(direction)=>{
        const currentIndex = songs.findIndex((song)=>{return song.id===currentSong.id})
    if( direction=="skip-back"){
        if(currentIndex-1==-1){
             await setCurrentSong(songs[songs.length-1])
        } else{
             await setCurrentSong(songs[currentIndex-1])
        }
    }
    else{
       await setCurrentSong(songs[((currentIndex+1)%songs.length)])
    }
    if(isPlaying){
        audioref.current.play()
    }

    }
    return (
        <PlayerContainer>
            <TimeLLineContainer>
                <p>
                    {getTime(songInfo.currentTime||0)}
                 </p>
                 <Track>
                 <Input 
                 onChange={dragHandler}
                 min={0}
                 max={songInfo.duration||0}
                 value= {songInfo.currentTime}
                 type="range"
                 />
                 <AnimatedTrack songInfo= {songInfo}></AnimatedTrack>

                </Track>
                <p>{getTime(songInfo.duration||0)} </p>

            </TimeLLineContainer>
        <PlayerControlContainer>
        
        <FontAwesomeIcon
        onClick={()=>skipMusic("skip-back")}
        className = "skip-back"
        icon={faAngleLeft}
        size="2x"
        style={pointer}
        />
        <FontAwesomeIcon
        onClick={playSongHandler}
        className = "play"
        icon={touglePlayPauseIcon()}
        size="2x"
        style={pointer}
        />
        <FontAwesomeIcon
        onClick={()=>skipMusic("skip-forward")}
        className = "skip-forward"
        icon={faAngleRight}
        size="2x"
        style={pointer}
        />

     
        </PlayerControlContainer>
        </PlayerContainer>
    );
}
const PlayerContainer = styled.div `
    in-height : 30vh;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;


`;
const PlayerControlContainer= styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 2rem;
     width: 30%;
     @media screen and(max-width :768px){
        width:60%
     }
`;
const TimeLLineContainer = styled.div`
 margin-top:5vh;
 width:50%;
 display:flex;
 @media screen and(max-width:768px){
    width:90%;
 }

`; 
const Input = styled.input`

width:100%;
-webkit-appearance:none;
background:transparent;
cursor:pointer;
/* pading-top:1rem;
padding-bottom:1rem;
*/
&:focus {
    outline:none;
    -webkit-apperance:none;
}
@media screen and (max-width: 768px) {
    &::-webkit-slider-thumb {
        height: 48px;
        width: 48px;
    }
}
&::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    background: transparent;
    border: none;
}
&::-moz-range-thumb {
    -webkit-appearance: none;
    background: transparent;
    border: none;
}
&::-ms-thumb {
    -webkit-appearance: none;
    background: transparent;
    border: none;
}
&::-moz-range-thumb {
    -webkit-appearance: none;
    background: transparent;
    border: none;
}
`;
const AnimatedTrack= styled.div`
background: rgb(204, 204, 204);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	transform: translateX(${(p) => Math.round((p.songInfo.currentTime * 100) / p.songInfo.duration) + "%"});
	pointer-events: none;
`;
const Track= styled.div`
background: lightblue;
	width: 100%;
	height: 1rem;
	position: relative;
	border-radius: 1rem;
	overflow: hidden;
	
`;


    
   

export default Player;
 