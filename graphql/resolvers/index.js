const Post = require('../../models/post');
const postResolvers = require('./postResolvers');
const userResolvers = require('./userResolvers');

module.exports = {
    Query: {
        ...postResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation
    }
}