const Post = require('../../models/post');
const postResolvers = require('./postResolvers');
const userResolvers = require('./userResolvers');
const commentResolvers = require('./commentResolvers');

module.exports = {
    Post: {
        commentCount: (parent) => (parent.comments.length),
        likeCount: (parent) => (parent.likes.length)
    },
    Query: {
        ...postResolvers.Query
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}