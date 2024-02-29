import { gql } from "apollo-boost";



const getMusicQuery = gql`
{
    musicData{
        name
        id
    }
}`

const getArtistQuery = gql`
{
    artistName{
        name
        id
    }
}`


const addMusicMutation = gql `
mutation ($name:String!, $genre:String!, $artistId:ID!){
    addMusic(name:$name, genre:$genre, artistId:$artistId){
        name
        id
    }
}`

const getDetailQuery = gql`
query($id:ID){
    album(id:$id){
        id
        name
        genre
        artist{
            id
            name
            musicData{
                name
                id
            }
        }
    }
}
`

export {getArtistQuery, getMusicQuery,addMusicMutation, getDetailQuery}