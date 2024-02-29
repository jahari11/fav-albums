const  graphql  = require('graphql');
const _= require('lodash')
const musicData = require('../models/musicdata')
const artistName = require('../models/artistname');
const { GraphQLObjectType, GraphQLString, GraphQLSchema,
GraphQLID, GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLInt } = graphql;

//dummy data 


const DataType = new GraphQLObjectType ({
    name:'Album',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        rating: {type: GraphQLFloat},
        artist: {
            type: NameDataType,
            resolve(parent, args){
                console.log(parent);
                //return _.find(artistName, {id:parent.artistId})
                return artistName.findById(parent.artistId)
            }
        }
    })
});

const NameDataType = new GraphQLObjectType ({
    name:'ArtistName',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type: GraphQLString},
        musicData: {
            type:new GraphQLList(DataType),
            resolve(parent, args){
                //return _.filter(musicData, {artistId:parent.id})
                return musicData.find({artistId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields:{
        album: {
            type: DataType,
            args: { id: {type: GraphQLID} },
            resolve(parent,args){
                //code to get from db / other source
                console.log(typeof(args.id))
               //return _.find(musicData, {id:args.id})
               return musicData.findById(args.id)
            }
        },

        artist: {
            type: NameDataType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                //return _.find(artistName, {id:args.id});
                return artistName.findById(args.id);
            }
        },
        musicData: {
            type: new GraphQLList(DataType),
            resolve(parent, args){
                //return musicData; 
                return musicData.find({});
            }
        },
        artistName: {
            type: new GraphQLList(NameDataType),
            resolve(parent, args){
                //return artistName;
                return artistName.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addArtist:{
            type:NameDataType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},

            },
            resolve(parent,args){
                let artist = new artistName({
                    name:args.name
                });
                return artist.save()
            }
        },
        addMusic: {
            type: DataType,
            args: {
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                rating:{type:GraphQLInt},
                artistId:{type:GraphQLID}
            },
            resolve(parent,args){
                let musicdata = new musicData({
                    name:args.name,
                    genre:args.genre,
                    rating:args.rating,
                    artistId:args.artistId
                })
                return musicdata.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});