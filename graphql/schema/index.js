const gql= require('graphql-tag');

const typeDefs = gql`
type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String
}
type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
}

input RegisterInput {
    username: String
    email: String
    password: String
    confirmPassword: String
}

type Query {
    getPosts: [Post]
}

type Mutation {
    register(registerInput: RegisterInput): User
}
`

module.exports = typeDefs;