const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb+srv://jaharicraw11:jv84WWY912M0WHCC@graphql.b0epffl.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.once('once', ()=> {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4500, () => {
    console.log('now listening to request on port 4500')
})