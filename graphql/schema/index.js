const gql= require('graphql-tag');

const typeDefs = gql`

type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String
}
type Comment {
    id: ID
    body: String
    username: String
    createdAt: String
}
type Like {
    username: String
    createdAt: String
}
type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]
    commentCount: Int!
    likeCount: Int!
}

input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
}

type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
}

type Mutation {
    register(registerInput: RegisterInput): User
    login(username: String, password: String): User
    createPost(body: String!): Post
    deletePost(postId: String!): String!
    createComment(postId: String!, body: String!): Post
    deleteComment(postId: ID!, commentId: ID!): Post
    likePost(postId: ID!): Post
}

`

module.exports = typeDefs;