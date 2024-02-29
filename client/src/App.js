import React from 'react'

import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

import MusicList from './Component/MusicList'
import AddMusic from './Component/AddMusic'
import Landing from './Component/Landing'

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4500/graphql'
})


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Landing />
      <MusicList />
    </ApolloProvider>
  )
}

export default App