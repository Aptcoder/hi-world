const Post = require('../../models/post');
const {AuthenticationError, UserInputError} = require('apollo-server')
const auth = require('../../util/auth');

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find({}).sort('-1');
                return posts
            }
            catch(err){
                throw new Error(err);
            }
        },
        getPost: async (_, { postId }) => {
            try {
                const post = Post.findById(postId);
                if(!post){
                    throw new Error('Post not found')
                }
                return post
            } 
            catch(err){
                throw new Error(err)
            }
        }
    },

    Mutation: {
        createPost: async (_,{ body }, context) => {
            try {
                const user = auth(context);
                const newPost = new Post({
                body,
                username: user.username,
                user: user.id
            });

            const post = await newPost.save();
            return post;
            } catch(err){
                throw new Error(err);
            }
        },
        deletePost: async (_, {postId }, context) => {
                const user = auth(context);
                const post = await Post.findById(postId);
                if(!post){
                    throw new UserInputError('Post Id not valid')
                }
                if(user.username !== post.username){
                    throw new AuthenticationError('You do not have access to this resource');
                }
                await Post.deleteOne({ _id: postId});
                return 'Deleted'
        },
    likePost: async (_, { postId }, context) => {
            const {username} = auth(context);
            const post = await Post.findById(postId);
            if(!post){
                throw new UserInputError('Post Id not valid'); 
            }
            if(post.likes.find((like) => (like.username === username))){
                post.likes = post.likes.filter((like) => (like.username !== username))
            } else {
                post.likes.push({
                    username,
                    createdAt: new Date().toISOString()
                })
            }

            await post.save();
            return post;
    }
    }
}