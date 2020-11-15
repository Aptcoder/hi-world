import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const FETCH_POSTS_QUERY = gql`
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
  }
}
`

const Home = () =>  {
        const { loading, error, data} = useQuery(FETCH_POSTS_QUERY);
        if(loading) console.log(loading);
        if(error)  console.log(error);
        if(data)  console.log(data);

        return (
            <Grid columns={3}>
            <Grid.Row>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    loading && error ? ( <h2>loading posts...</h2> )
                     : (
                        data
                        && 
                        data.getPosts.map(
                            (post) => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20}}>
                            <PostCard post={post}/>
                            </Grid.Column>
                            )
                        )
                    )
                }
            </Grid.Row>
            </Grid>
        );
}


export default Home;
