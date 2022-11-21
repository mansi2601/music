import {useState} from 'react';
import styled from 'styled-components'
function Song({currentSong}){
    return(
        <SongContainer>
            <Img src={currentSong.cover}></Img>
            <H1>{currentSong.name}</H1>
            <H2>{currentSong.artist}</H2>
        </SongContainer>
    );
}
const SongContainer= styled.div`
        margin-top: 10vh;
        min-height:50vh;
        max-height:50vh;
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content;
    
`;
const Img = styled.img`
	width: 20%;
	border-radius: 50%;
	@media screen and (max-width: 768px) {
		width: 50%;
	}
`;

const H1 = styled.h2`
	padding: 3rem 1rem 1rem 1rem;
`;

const H2 = styled.h3`
	font-size: 1rem;
`;
export default Song;