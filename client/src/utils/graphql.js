import gql from 'graphql-tag';

export const CREATE_POST_MUTATION = gql` 
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt
            likes {
                username
            }
            comments {
                id
                username
                body
            }
            likeCount
            commentCount
        }
    }
`

export const FETCH_POSTS_QUERY = gql`
 query {
  getPosts{
    body
    username
    likeCount
    commentCount
    id
    createdAt
    comments{
      body
      username
    }
    likes{
        username
    }
  }
}
`