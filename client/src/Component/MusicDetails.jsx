import React from 'react'
import {flowRight as compose} from 'lodash';
import { graphql } from 'react-apollo'
import { getDetailQuery } from '../queries/queries';

const MusicDetails = (props) => {
const displayMusicDetails = () => {
   const {album} = props.data;
   console.log(props)

   if (album){
    return(
        <div className='fav-album-list'>
            <h2>{album.name}</h2>
            <p className='artist-name'>{album.artist.name}</p>
            <p className='genre'>{album.genre}</p>
            <p className='fav-txt'>My favorite albums by this artist:</p>
            <ul className='other-albums'>
                {album.artist.musicData.map(item =>{
                    return <li key={item.id}>{item.name}</li>
                })}
            </ul>
        </div>
    )
   } else{
    return (
        <div>
            None selected
        </div>
    )}

}
  return (
    <div id='book-details'>
        {displayMusicDetails()}
    </div>
  )
}

export default graphql(getDetailQuery, {options: (props) => {
    return {
        variables: {
            id: props.musicId
        }
    }
}})(MusicDetails)