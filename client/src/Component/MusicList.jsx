import React, {useState} from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { getMusicQuery } from '../queries/queries'
import MusicDetails from './MusicDetails'
import AddMusic from './AddMusic'


const MusicList = (props) => {
    const [selected, setSelected] = useState(null)
    const displayMusic= () =>{
        const {data} = props;
        if (data.loading){
            return(<p>Loading Music...</p>);
        } else {
            return data.musicData.map(music => {
                return(
                    <li key={music.id} onClick={(e)=> setSelected(music.id)}>{music.name}</li>
                )
            })
        }
    };
  return (
    <>
    <div className='music-list'>
        <ul id='music-list'>
            {displayMusic()}
        </ul>
        <MusicDetails musicId={selected} />
    </div>
    <AddMusic />
    </>
  )
}

export default graphql(getMusicQuery)(MusicList);