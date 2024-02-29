import React, {useState} from 'react'
import { graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash';
import { getArtistQuery,addMusicMutation, getMusicQuery } from '../queries/queries'

const AddMusic = (props) => {
    const [albumName, setAlbumName] = useState('');
    const [genre, setGenre] = useState('');
    const [selectedArtist, setSelectedArtist] = useState('');
    const displayArtists = () => {
        let data = props.getArtistQuery;
        if (data.loading){
            return (<option disabled>Loading Artists</option>)
        } else {
            return data.artistName.map(artist => {
                return (<option key={artist.id} value={artist.id}>{artist.name}</option>)
            })
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        props.addMusicMutation({
            variables: {
                name:albumName,
                genre:genre,
                artistId: selectedArtist
            },
            refetchQueries:[{query: getMusicQuery}]
        });
    }
  return (
    <div className='music-details' >
        <span>If we share any interests in the same artists please add your fav albums. </span>
    <form className='details-form' onSubmit={handleSubmit}>
        <div className='field'>
            <label>Album Name:</label>
            <input type="text" value={albumName} onChange={(e)=> setAlbumName(e.target.value)} />
        </div>
        <div className='field'>
            <label>Genre:</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div className="field">
            <label>Artist:</label>
            <select value={selectedArtist} onChange={(e)=> setSelectedArtist(e.target.value)}>
                <option>
                    Select Artist
                </option>
                {displayArtists()}
            </select>
        </div>
        <button>+</button>
    </form>
    </div>
  )
}

export default compose(
    graphql(getArtistQuery, {name:"getArtistQuery"}),
    graphql(addMusicMutation, {name:"addMusicMutation"})
)(AddMusic);