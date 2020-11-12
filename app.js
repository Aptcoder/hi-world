const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schema');

const url = process.env.MONGO_URL

mongoose.connect(url, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true})
      .then(() => {
          console.log('successfully connected to mongo')
      })


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen({ port: 5000 })
      .then((res) => {
          console.log('Server is running at', res.url);
      })