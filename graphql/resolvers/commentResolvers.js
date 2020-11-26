const Post = require('../../models/post');
const {AuthenticationError, UserInputError} = require('apollo-server')
const auth = require('../../util/auth');
const mongoose  = require('mongoose');


module.exports = {
    Mutation: {
        createComment: async (_, { postId, body}, context) => {
                const {username } = auth(context);
                if(body.trim === ""){
                    throw new UserInputError("Body of comment is empty", {
                        errors: {
                            body: 'Body of comment must not be empty'
                        }
                    })
                }
            const post = await Post.findById(postId);
            if(!post){
                throw new Error('Post not found')
            }
            post.comments.unshift({
                id: new mongoose.Types.ObjectId(),
                body,
                username,
                createdAt: new Date().toISOString()
            });

            await post.save();
            return post;
            },
            deleteComment: async (_, { postId, commentId}, context) => {
                const {username } = auth(context);
                const post = await Post.findById(postId);
                if(!post){
                    throw new Error('Post not found')
                }
                const commentIndex = post.comments.findIndex(c => c.id == commentId);
                if(commentIndex > -1 && post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }
                throw new AuthenticationError('Action not allowed');
        }   
        },
}